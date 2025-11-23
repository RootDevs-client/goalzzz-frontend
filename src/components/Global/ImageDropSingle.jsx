// import Image from 'next/image';
// import { useCallback, useEffect, useState } from 'react';
// import { useDropzone } from 'react-dropzone';
// import { FaTrashAlt } from 'react-icons/fa';

// const ImageDropSingle = ({ className, value, onChange }) => {
//   const [preview, setPreview] = useState(null);

//   const onDrop = useCallback(
//     (acceptedFiles) => {
//       if (acceptedFiles?.length) {
//         const file = acceptedFiles[0];
//         const fileWithPreview = Object.assign(file, {
//           preview: URL.createObjectURL(file),
//         });
//         setPreview(fileWithPreview.preview);
//         onChange(fileWithPreview);
//       }
//     },
//     [onChange]
//   );

//   const { getRootProps, getInputProps } = useDropzone({
//     accept: {
//       'image/*': ['.jpeg', '.jpg', '.png'],
//     },
//     maxSize: 1024 * 1000,
//     onDrop,
//   });

//   useEffect(() => {
//     // Revoke the data uri to avoid memory leaks
//     return () => {
//       if (preview) {
//         URL.revokeObjectURL(preview);
//       }
//     };
//   }, [preview]);

//   const removeFile = () => {
//     setPreview(null);
//     onChange(null);
//   };

//   return (
//     <>
//       <div
//         {...getRootProps({
//           className: className,
//         })}
//       >
//         {value && preview ? (
//           <div className="flex items-center gap-3">
//             <img
//               src={preview}
//               alt="Uploaded Image"
//
//
//
//               className="h-24 w-24 rounded-md border border-gray-200 object-contain p-1"
//             />
//             {value && value.name && (
//               <p className="mt-2 text-[14px] font-bold text-gray-800">
//                 {value.name}
//               </p>
//             )}
//             <button
//               type="button"
//               className="rounded bg-red-500 p-1"
//               onClick={removeFile}
//             >
//               <FaTrashAlt className="hover:fill-secondary-400 h-5 w-5 fill-white transition-colors" />
//             </button>
//           </div>
//         ) : (
//           <div className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed bg-rose-50 p-2">
//             <input {...getInputProps()} />

//             <svg
//               width="80px"
//               height="80px"
//               viewBox="0 0 48 48"
//               version="1"
//               xmlns="http://www.w3.org/2000/svg"
//               enable-background="new 0 0 48 48"
//             >
//               <path
//                 fill="#8CBCD6"
//                 d="M31,41H8c-2.2,0-4-1.8-4-4V11c0-2.2,1.8-4,4-4h32c2.2,0,4,1.8,4,4v17C44,35.2,38.2,41,31,41z"
//               />
//               <circle fill="#B3DDF5" cx="35" cy="16" r="3" />
//               <polygon fill="#9AC9E3" points="20,16 9,32 31,32" />
//               <polygon fill="#B3DDF5" points="31,22 23,32 39,32" />
//               <path
//                 fill="#E57373"
//                 d="M47.7,29.1l-2.8-2.8c-0.4-0.4-1.1-0.4-1.6,0L42,27.6l4.4,4.4l1.3-1.3C48.1,30.3,48.1,29.6,47.7,29.1z"
//               />
//               <rect
//                 x="27.1"
//                 y="35.1"
//                 transform="matrix(.707 -.707 .707 .707 -16.508 36.511)"
//                 fill="#FF9800"
//                 width="17.4"
//                 height="6.2"
//               />
//               <rect
//                 x="41.5"
//                 y="27.8"
//                 transform="matrix(-.707 .707 -.707 -.707 95.395 22.352)"
//                 fill="#B0BEC5"
//                 width="3.1"
//                 height="6.2"
//               />
//               <polygon fill="#FFC107" points="27.5,42.2 26,48 31.8,46.5" />
//               <polygon fill="#37474F" points="26.7,45 26,48 29,47.3" />
//             </svg>

//             <h3 className="mt-2 text-sm font-medium text-gray-900">
//               <label for="file-upload" className="relative cursor-pointer">
//                 <span>Drag and drop</span>
//                 <span className="text-indigo-600"> or browse</span>
//                 <span>to upload</span>
//                 <input
//                   id="file-upload"
//                   name="file-upload"
//                   type="file"
//                   className="sr-only"
//                 />
//               </label>
//             </h3>
//             <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default ImageDropSingle;

import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaTrashAlt } from 'react-icons/fa';

const ImageDropSingle = ({ className, value, onChange }) => {
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      // Check if the file is present and is an image
      if (file && file.type.startsWith('image/')) {
        // Check if the file size is within limits (1 MB in this example)
        if (file.size <= 1024 * 1000) {
          const fileWithPreview = Object.assign(file, {
            preview: URL.createObjectURL(file),
          });
          setPreview(fileWithPreview.preview);
          onChange(fileWithPreview);
          setError(null); // Clear any previous errors
        } else {
          setError('File size exceeds 1MB. Please choose a smaller file.');
        }
      } else {
        setError('Invalid file type. Please choose a valid image file.');
      }
    },
    [onChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    maxSize: 1024 * 1000, // 1 MB
    onDrop,
  });

  useEffect(() => {
    // Revoke the data uri to avoid memory leaks
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const removeFile = () => {
    setPreview(null);
    onChange(null);
    setError(null); // Clear any previous errors
  };

  return (
    <>
      <div
        {...getRootProps({
          className: className,
        })}
      >
        {value && preview ? (
          <div className="flex items-center gap-3">
            <img
              src={preview}
              alt="Uploaded Image"
              className="h-24 w-24 rounded-md border border-gray-200 object-contain p-1"
            />
            {value && value.name && (
              <p className="mt-2 text-[14px] font-bold text-gray-800">
                {value.name}
              </p>
            )}
            <button
              type="button"
              className="rounded bg-red-500 p-1"
              onClick={removeFile}
            >
              <FaTrashAlt className="hover:fill-secondary-400 h-5 w-5 fill-white transition-colors" />
            </button>
          </div>
        ) : (
          <div className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed bg-rose-50 p-2">
            <input {...getInputProps()} />
            <svg
              width="80px"
              height="80px"
              viewBox="0 0 48 48"
              version="1"
              xmlns="http://www.w3.org/2000/svg"
              enable-background="new 0 0 48 48"
            >
              <path
                fill="#8CBCD6"
                d="M31,41H8c-2.2,0-4-1.8-4-4V11c0-2.2,1.8-4,4-4h32c2.2,0,4,1.8,4,4v17C44,35.2,38.2,41,31,41z"
              />
              <circle fill="#B3DDF5" cx="35" cy="16" r="3" />
              <polygon fill="#9AC9E3" points="20,16 9,32 31,32" />
              <polygon fill="#B3DDF5" points="31,22 23,32 39,32" />
              <path
                fill="#E57373"
                d="M47.7,29.1l-2.8-2.8c-0.4-0.4-1.1-0.4-1.6,0L42,27.6l4.4,4.4l1.3-1.3C48.1,30.3,48.1,29.6,47.7,29.1z"
              />
              <rect
                x="27.1"
                y="35.1"
                transform="matrix(.707 -.707 .707 .707 -16.508 36.511)"
                fill="#FF9800"
                width="17.4"
                height="6.2"
              />
              <rect
                x="41.5"
                y="27.8"
                transform="matrix(-.707 .707 -.707 -.707 95.395 22.352)"
                fill="#B0BEC5"
                width="3.1"
                height="6.2"
              />
              <polygon fill="#FFC107" points="27.5,42.2 26,48 31.8,46.5" />
              <polygon fill="#37474F" points="26.7,45 26,48 29,47.3" />
            </svg>

            {error ? (
              <p className="text-red-500 text-sm">{error}</p>
            ) : (
              <>
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer"
                  >
                    <span>Drag and drop</span>
                    <span className="text-indigo-600"> or browse</span>
                    <span> to upload!</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                    />
                  </label>
                </h3>
                <p className="mt-1 text-xs text-gray-500">
                  PNG, JPG, GIF up to 1MB
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ImageDropSingle;

// import Image from 'next/image';
// import { useCallback, useEffect, useState } from 'react';
// import { useDropzone } from 'react-dropzone';
// import { FaTrashAlt } from 'react-icons/fa';

// const ImageDropSingle = ({ className, value, onChange }) => {
//   const [preview, setPreview] = useState(null);

//   const onDrop = useCallback(
//     (acceptedFiles) => {
//       if (acceptedFiles?.length) {
//         const file = acceptedFiles[0];
//         const fileWithPreview = Object.assign(file, {
//           preview: URL.createObjectURL(file),
//         });
//         setPreview(fileWithPreview.preview);
//         onChange(fileWithPreview);
//       }
//     },
//     [onChange]
//   );

//   const { getRootProps, getInputProps } = useDropzone({
//     accept: {
//       'image/*': ['.jpeg', '.jpg', '.png'],
//     },
//     maxSize: 1024 * 1000,
//     onDrop,
//   });

//   useEffect(() => {
//     // Revoke the data uri to avoid memory leaks
//     return () => {
//       if (preview) {
//         URL.revokeObjectURL(preview);
//       }
//     };
//   }, [preview]);

//   const removeFile = () => {
//     setPreview(null);
//     onChange(null);
//   };

//   return (
//     <>
//       <div
//         {...getRootProps({
//           className: className,
//         })}
//       >
//         {value && preview ? (
//           <div className="flex items-center gap-3">
//             <img
//               src={preview}
//               alt="Uploaded Image"
//
//
//
//               className="h-24 w-24 rounded-md border border-gray-200 object-contain p-1"
//             />
//             {value && value.name && (
//               <p className="mt-2 text-[14px] font-bold text-gray-800">
//                 {value.name}
//               </p>
//             )}
//             <button
//               type="button"
//               className="rounded bg-red-500 p-1"
//               onClick={removeFile}
//             >
//               <FaTrashAlt className="hover:fill-secondary-400 h-5 w-5 fill-white transition-colors" />
//             </button>
//           </div>
//         ) : (
//           <div className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed bg-green-50 p-2">
//             <input {...getInputProps()} />

//             <div className="flex flex-col items-center">
//               <p className="font-bold text-gray-600">Drag & Drop Image here</p>
//               <div className="divider">OR</div>
//               <button type="button" className="btn btn-primary btn-sm rounded">
//                 Browse File
//               </button>
//               <p className="mt-3 text-xs text-orange-400">Maximum Size: 1MB</p>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default ImageDropSingle;
