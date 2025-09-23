import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Upload } from '../../services/upload';

@Component({
  selector: 'app-file-upload',
  imports: [CommonModule],
  templateUrl: './file-upload.html',
  styleUrl: './file-upload.css'
})
export class FileUpload implements OnInit {
  uploads: any[] = [];
  dragOver = false;

  constructor(private uploadService: Upload) {}

  ngOnInit() {
    this.loadUploads();
  }

  loadUploads() {
    this.uploadService.getUploads().subscribe(uploads => {
      this.uploads = uploads;
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.uploadFile(file);
    }
  }

  onDragOver(event: any) {
    event.preventDefault();
    this.dragOver = true;
  }

  onDragLeave(event: any) {
    event.preventDefault();
    this.dragOver = false;
  }

  onDrop(event: any) {
    event.preventDefault();
    this.dragOver = false;
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      this.uploadFile(files[0]);
    }
  }

  uploadFile(file: File) {
    this.uploadService.uploadFile(file).subscribe(() => {
      this.loadUploads();
    });
  }

  downloadFile(upload: any) {
    this.uploadService.downloadFile(upload.id).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = upload.fileName;
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }

  deleteFile(id: number) {
    if (confirm('Are you sure?')) {
      this.uploadService.deleteUpload(id).subscribe(() => {
        this.loadUploads();
      });
    }
  }

  isImage(fileType: string): boolean {
    return fileType.startsWith('image/');
  }
}