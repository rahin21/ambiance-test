import { writeFile, mkdir, unlink } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

const files: File[] = [];
let targetDIR:FormDataEntryValue;

export async function POST(request: NextRequest) {
  const data = await request.formData();
  data.forEach((value, key) => {
    if (key.startsWith('file_') && value instanceof File) {
      files.push(value);
    }
    if (key.startsWith('targetDIR')){
      targetDIR=value;
    }
  });
  
  if (files.length === 0) {
    return NextResponse.json({ success: false });
  }

  const uploadDir = path.join(process.cwd(), 'public', 'uploads', `${targetDIR}`);

  // Ensure the upload directory exists
  try {
    await mkdir(uploadDir, { recursive: true });
  } catch (error) {
    console.error('Error creating upload directory:', error);
    return NextResponse.json({ success: false, error: 'Error creating upload directory' });
  }

    const fileSavePromises = files.map(async (file) => {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filePath = path.join(uploadDir, file.name);
    
    await writeFile(filePath, buffer);
    console.log(`open ${filePath} to see the uploaded file`);
  });

  try {
    await Promise.all(fileSavePromises);
  } catch (error) {
    console.error('Error saving files:', error);
    return NextResponse.json({ success: false, error: 'Error saving files' });
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  try {
    const { locations } = await req.json();

    if (!Array.isArray(locations) || locations.length === 0) {
      return NextResponse.json({ message: 'Invalid Data' }, { status: 422 });
    }

    const deletePromises = locations.map(async (location) => {
      const deleteDir = path.join(process.cwd(), 'public', `${location}`);
      try {
        await unlink(deleteDir);
        console.log(`Delete Successful for ${location}.`);
      } catch (error) {
        console.error(`Error deleting directory ${location}:`, error);
        throw new Error(`Error deleting directory ${location}`);
      }
    });

    try {
      await Promise.all(deletePromises);
      return NextResponse.json({ message: 'All deletions successful' }, { status: 200 });
    } catch (error) {
      console.error('One or more deletions failed:', error);
      return NextResponse.json({ message: 'One or more deletions failed' }, { status: 500 });
    }
  } catch (error) {
    console.error('Server Error:', error);
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}