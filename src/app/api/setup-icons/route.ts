import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const publicDir = path.join(process.cwd(), 'public');
    const sourceImagePath = path.join(publicDir, 'navbar-image.jpg');
    
    // Check if source image exists
    try {
      await fs.access(sourceImagePath);
    } catch (error) {
      return NextResponse.json({ error: 'Source image not found' }, { status: 404 });
    }
    
    // Read the source image
    const imageData = await fs.readFile(sourceImagePath);
    
    // Define target paths
    const targets = [
      { path: path.join(publicDir, 'favicon.ico'), name: 'favicon.ico' },
      { path: path.join(publicDir, 'apple-icon.png'), name: 'apple-icon.png' },
      { path: path.join(publicDir, 'og-image.jpg'), name: 'og-image.jpg' }
    ];
    
    // Copy the image to all target paths
    const results = await Promise.all(
      targets.map(async (target) => {
        try {
          await fs.writeFile(target.path, imageData);
          return { file: target.name, success: true };
        } catch (error) {
          console.error(`Error copying to ${target.name}:`, error);
          return { file: target.name, success: false, error: String(error) };
        }
      })
    );
    
    return NextResponse.json({ 
      message: 'Setup completed', 
      results,
      source: 'navbar-image.jpg'
    });
    
  } catch (error) {
    console.error('Error in icon setup:', error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
} 