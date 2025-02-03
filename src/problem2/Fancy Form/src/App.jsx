import { useState } from 'react'
import { Alert } from "@material-tailwind/react";
import Select from 'react-select'
import options from './lib/currencyCode.json'
import url from './lib/url.json'
import './App.css'





function App() {
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [sendCode, setSendCode] = useState(0.0);
  const [receiveCode, setReceiveCode] = useState(0.0);
  const [amountToSend, setAmountToSend] = useState("");
  const [amountToReceive, setAmountToReceive] = useState("");

  function Icon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
        />
      </svg>
    );
  }

  function swap() {
    fetch(url.url)
      .then(res => res.json())
      .then(data => {
        // Set validation
        if (!amountToSend) {
          setOpen(true);
          setAlertMessage("Please input amount to send !");
        }
        else if (!sendCode) {
          setOpen(true);
          setAlertMessage("Please select the currency to send !");
        }
        else if (!receiveCode) {
          setOpen(true);
          setAlertMessage("Please select the currency to receive !");
        }
        else {
          // calculate curency swap
          setOpen(false);
          const rateSend = data.rates[sendCode];
          const rateReceive = data.rates[receiveCode];
          setAmountToReceive((rateReceive * amountToSend / rateSend).toFixed(2) || 0);
        }
      })
      .catch(error => console.log(error));
  }


  return (
    <>
      <h5 style={{ marginBottom: '30px', textAlign: 'center' }}>Swap</h5>
      <form >
        <div class="max-w-sm space-y-3" style={{ marginBottom: '15px' }}>
          <div>
            <label class="block text-sm font-medium mb-2 dark:text-white">Amount to send</label>
            <div class="relative">
              <input onInput={value => {
                setAmountToSend(value.target.value);
              }
              } id="hs-inline-leading-select-label" name="inline-add-on" class="py-3 px-4 ps-30 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-90 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" />
              <div class="absolute inset-y-0 start-0 flex items-center text-gray-500 ps-px">
                <Select id="hs-inline-leading-select-country" options={options} onChange={value =>
                  setSendCode(value.value)} name="hs-inline-leading-select-country" class="block w-full border-transparent rounded-lg focus:ring-blue-600 focus:border-blue-600 dark:text-neutral-500 dark:bg-neutral-800">
                </Select >
              </div>
            </div>
          </div>
        </div>
        <div class="max-w-sm space-y-3">
          <div>
            <label class="block text-sm font-medium mb-2 dark:text-white">Amount to receive</label>
            <div class="relative">
              <input value={amountToReceive} id="hs-inline-leading-select-label" name="inline-add-on" class="py-3 px-4 ps-30 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-90 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" disabled />
              <div class="absolute inset-y-0 start-0 flex items-center text-gray-500 ps-px">
                <Select class="py-3 px-4 pe-11 block w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  options={options} onChange={value => setReceiveCode(value.value)}>
                </Select>
              </div>
            </div>
          </div>
        </div>

        <Alert color="amber" animate style={{ marginTop: '20px' }} open={open} icon={<Icon />}>{alertMessage}</Alert>
        <div class="mb-5" style={{ marginTop: '40px', textAlign: 'center' }}>
          <button type="button" onClick={() => swap()} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">CONFIRM SWAP</button>
        </div>

      </form >
    </>
  )
}



export default App
