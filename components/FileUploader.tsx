import { useDropzone } from 'react-dropzone'

export default function FileUploader() {
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone()

  return (
    <div className='mb-4'>
      <label className='label'>Ladda upp filer</label>
      <div {...getRootProps({ className: 'dropzone p-4 border border-dashed rounded cursor-pointer bg-base-100' })}>
        <input {...getInputProps()} />
        <p>Dra och släpp filer här, eller klicka</p>
      </div>
      <ul className='mt-2 text-sm'>
        {acceptedFiles.map((file, i) => (
          <li key={i}>{file.name}</li>
        ))}
      </ul>
    </div>
  )
}