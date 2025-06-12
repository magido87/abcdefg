export default function ThemeToggle() {
  return (
    <div className='form-control mb-4'>
      <label className='cursor-pointer label'>
        <span className='label-text'>Mörkt läge</span>
        <input
          type='checkbox'
          className='toggle ml-2'
          onChange={() => {
            const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
            document.documentElement.setAttribute('data-theme', theme)
          }}
        />
      </label>
    </div>
  )
}