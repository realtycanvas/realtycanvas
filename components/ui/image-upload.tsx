'use client';

import Image from 'next/image';
import { useState, useRef, useCallback } from 'react';

export interface UploadedFile {
  url: string;
  name: string;
  size: number;
  type: string;
}

export interface ImageUploadProps {
  value?: string | string[]; // current image URL(s)
  onChange: (url: string | string[]) => void;
  multiple?: boolean; // allow multiple uploads
  maxSize?: number; // max file size in MB (default: 5)
  accept?: string; // accepted MIME types
  className?: string;
  disabled?: boolean;
  label?: string;
}

export default function ImageUpload({
  value,
  onChange,
  multiple = false,
  maxSize = 5,
  accept = 'image/*',
  className = '',
  disabled = false,
  label = 'Upload Image',
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [mode, setMode] = useState<'upload' | 'url'>('upload');
  const [urlInput, setUrlInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const currentImages = Array.isArray(value) ? value : value ? [value] : [];

  const uploadFile = async (file: File): Promise<UploadedFile | null> => {
    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File "${file.name}" exceeds ${maxSize}MB limit`);
      return null;
    }

    // Validate file type
    if (accept !== '*' && !file.type.match(accept.replace('*', '.*'))) {
      setError(`File "${file.name}" is not a valid type`);
      return null;
    }

    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || 'Upload failed');
    }

    const data = await res.json();
    return { url: data.url, name: file.name, size: file.size, type: file.type };
  };

  const handleFiles = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0) return;
      setError(null);
      setUploading(true);

      try {
        if (multiple) {
          const uploads = await Promise.all(Array.from(files).map((f) => uploadFile(f)));
          const urls = uploads.filter(Boolean).map((u) => u!.url);
          onChange([...currentImages, ...urls]);
        } else {
          const result = await uploadFile(files[0]);
          if (result) onChange(result.url);
        }
      } catch (e: any) {
        setError(e.message || 'Upload failed');
      } finally {
        setUploading(false);
        // reset input so same file can be re-uploaded
        if (inputRef.current) inputRef.current.value = '';
      }
    },
    [multiple, currentImages, onChange]
  );

  const removeImage = (urlToRemove: string) => {
    if (multiple) {
      onChange(currentImages.filter((url) => url !== urlToRemove));
    } else {
      onChange('');
    }
  };

  const handleAddUrl = () => {
    if (!urlInput.trim()) {
      setError('Please enter a valid URL');
      return;
    }

    try {
      new URL(urlInput);
      setError(null);

      if (multiple) {
        onChange([...currentImages, urlInput]);
      } else {
        onChange(urlInput);
      }
      setUrlInput('');
    } catch {
      setError('Please enter a valid URL (e.g., https://example.com/image.jpg)');
    }
  };

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}

      {/* Mode Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        <button
          type="button"
          onClick={() => {
            setMode('upload');
            setError(null);
          }}
          className={`px-3 py-2 text-sm font-medium border-b-2 transition-colors ${
            mode === 'upload' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          📤 Upload File
        </button>
        <button
          type="button"
          onClick={() => {
            setMode('url');
            setError(null);
          }}
          className={`px-3 py-2 text-sm font-medium border-b-2 transition-colors ${
            mode === 'url' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          🔗 Use URL
        </button>
      </div>

      {/* Upload Mode */}
      {mode === 'upload' && (
        <>
          {/* Drop Zone */}
          <div
            onClick={() => !disabled && inputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              handleFiles(e.dataTransfer.files);
            }}
            className={`
              relative flex flex-col items-center justify-center
              border-2 border-dashed rounded p-6 cursor-pointer
              transition-all duration-200
              ${dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400 bg-gray-50'}
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
              ${uploading ? 'pointer-events-none' : ''}
            `}
          >
            {uploading ? (
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                <span className="text-sm text-gray-500">Uploading...</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="w-10 h-10 text-gray-400">
                  {/* Upload Icon */}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                    />
                  </svg>
                </div>
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-blue-600">Click to upload</span> or drag & drop
                </p>
                <p className="text-xs text-gray-400">
                  {accept === 'image/*' ? 'PNG, JPG, WEBP, GIF' : accept} up to {maxSize}MB
                  {multiple && ' · Multiple files allowed'}
                </p>
              </div>
            )}
          </div>

          {/* Hidden Input */}
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            multiple={multiple}
            className="hidden"
            disabled={disabled}
            onChange={(e) => handleFiles(e.target.files)}
          />
        </>
      )}

      {/* URL Mode */}
      {mode === 'url' && (
        <div className="flex gap-2">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => {
              setUrlInput(e.target.value);
              setError(null);
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') handleAddUrl();
            }}
            placeholder="https://example.com/image.jpg"
            className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            disabled={disabled}
          />
          <button
            type="button"
            onClick={handleAddUrl}
            disabled={disabled || !urlInput.trim()}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Add
          </button>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <p className="text-sm text-red-500 flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      )}

      {/* Image Previews */}
      {currentImages.length > 0 && (
        <div className={`grid gap-3 ${multiple ? 'grid-cols-3' : 'grid-cols-1'}`}>
          {currentImages.map((url) => {
            const isExternal = url.startsWith('http');
            return (
              <div
                key={url}
                className="relative group rounded overflow-hidden border border-gray-200 bg-gray-100"
                style={{ aspectRatio: '16/9' }}
              >
                <Image
                  src={url}
                  alt="Uploaded"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  unoptimized={isExternal}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                {!disabled && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage(url);
                    }}
                    className="absolute top-1.5 right-1.5 bg-red-500 text-white rounded-full w-6 h-6
                      flex items-center justify-center opacity-0 group-hover:opacity-100
                      transition-opacity text-xs font-bold hover:bg-red-600"
                  >
                    ✕
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
