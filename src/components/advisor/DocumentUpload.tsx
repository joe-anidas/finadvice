import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { FileText, Upload, X } from 'lucide-react';

interface DocumentUploadProps {
  onUpload: (files: File[]) => void;
  onCancel: () => void;
}

export function DocumentUpload({ onUpload, onCancel }: DocumentUploadProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onUpload(acceptedFiles);
      }
    },
    [onUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
    },
    maxFiles: 1,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="rounded-lg border-2 border-dashed p-6 text-center"
    >
      <div
        {...getRootProps()}
        className={`cursor-pointer ${isDragActive ? 'border-primary-500 bg-primary-50' : ''}`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center">
          <div className="mb-3 rounded-full bg-primary-100 p-3">
            <FileText className="h-6 w-6 text-primary-600" />
          </div>
          <p className="mb-2 text-accent-700">
            {isDragActive ? 'Drop the file here' : 'Upload financial documents for analysis'}
          </p>
          <p className="text-sm text-accent-500">Drag & drop or click to browse</p>
          <p className="mt-1 text-xs text-accent-500">Supported formats: PDF, JPG, PNG</p>
          <div className="mt-4 flex space-x-3">
            <button
              type="button"
              className="btn-primary text-sm flex items-center"
            >
              <Upload className="mr-1 h-4 w-4" />
              Select File
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onCancel();
              }}
              className="btn-outline text-sm flex items-center"
            >
              <X className="mr-1 h-4 w-4" />
              Cancel
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}