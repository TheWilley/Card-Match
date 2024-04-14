import { useState } from 'react';

function Footer() {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <footer className='absolute bottom-3 left-1/2 -translate-x-1/2 transform'>
        <button className='text-pink-300' onClick={() => setShowDialog(true)}>
          Attribution
        </button>
      </footer>
      <dialog
        open={showDialog}
        className='fixed inset-x-0 inset-y-0 z-40 m-auto h-screen w-screen overflow-y-scroll border-4 border-black bg-white p-4'
      >
        <div className='scrollbar-hide flex h-full overflow-auto whitespace-nowrap'>
          <div className='m-auto'>
            <ul>
              <li className='hover:text-pink-500'>
                <a href='https://dani-maccari.itch.io/cute-cards-deck' target='_blank'>
                  "Cute Cards" by DANI MACCARI
                </a>
              </li>
              <li className='hover:text-pink-500'>
                <a
                  href='https://fonts.google.com/specimen/Capriola/about'
                  target='_blank'
                >
                  "Capriola" font by Viktoriya Grabowska
                </a>
              </li>
              <li>
                <a
                  href='https://github.com/TheWilley/CardMatchPro'
                  target='_blank'
                  className='hover:text-pink-500'
                >
                  Game created by TheWilley (Source Code)
                </a>
              </li>
            </ul>
            <form
              method='dialog'
              onSubmit={() => setShowDialog(false)}
              className='flex justify-center'
            >
              <button className='capirola text-md mt-2 block rounded-full border-2 p-3 text-pink-500 transition-all ease-in-out hover:bg-pink-500 hover:text-white'>
                OK
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default Footer;
