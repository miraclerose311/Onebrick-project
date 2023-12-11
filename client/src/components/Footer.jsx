import { Link } from "react-router-dom";
import logoWhiteImg from "../assets/img/logo-white.png";

export default function Footer() {
	return (
		<footer className="relative bg-gray-900 pt-8 pb-6 font-montserrat">
			{/* <div className='flex flex-wrap'>
        <div className='w-full lg:w-4/12 px-4'>
          <h4 className='text-3xl font-semibold'>Let&apos;s keep in touch!</h4>
          <h5 className='text-lg mt-0 mb-2 text-gray-700'>
            Find us on any of these platforms, we respond 1-2 business days.
          </h5>
        </div>
        <div className='w-full lg:w-4/12 px-4'>
          <div className='flex flex-wrap items-top mb-6'>
            <div className='w-full lg:w-2/12 px-4 ml-auto'>
              <span className='block uppercase text-gray-600 text-sm font-semibold mb-2'>
                Useful Links
              </span>
              <ul className='list-4'>
                <li>
                  <Link
                    className='text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm'
                    to='/'
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    className='text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm'
                    to='#'
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    className='text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm'
                    to='#'
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    className='text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm'
                    to='#'
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div className='w-full lg:w-2/12 px-4'>
              <span className='block uppercase text-gray-600 text-sm font-semibold mb-2'>
                Other Resources
              </span>
              <ul className='list-unstyled'>
                <li>
                  <a
                    className='text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm'
                    href='#'
                  >
                    MIT License
                  </a>
                </li>
                <li>
                  <a
                    className='text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm'
                    href='#'
                  >
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a
                    className='text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm'
                    href='#'
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div> */}
			<div className="flex flex-wrap px-12 sm:px-16 md:px-24 lg:px-24 xl:px-40 2xl:px-64">
				<div className="w-full xl:w-1/3">
					<img
						src={logoWhiteImg}
						className="h-28"
					/>
					<p className="text-gray-400">
						Alpha Hospice stands as a beacon of compassion, offering palliative
						care with dignity and respect. Our dedicated team provides comfort
						and support to those in their final journey.
					</p>
				</div>
				<div className="w-full xl:w-2/3 flex flex-col lg:flex-row">
					<div className="w-full flex flex-col md:flex-row">
						<div className="w-full lg:w-1/2 flex flex-col text-gray-400">
							<p className="py-4 text-2xl font-bold text-gray-300">
								QUICK LINKS
							</p>
							<ul>
								<li className="py-2 hover:text-gray-200">
									<Link to="/buybrick">BUY A BRICK</Link>
								</li>
								<li className="py-2 hover:text-gray-200">
									<Link to="/about">ABOUT US</Link>
								</li>
								<li className="py-2 hover:text-gray-200">
									<Link to="/beneficiaries">BENEFICIARIES</Link>
								</li>
								<li className="py-2 hover:text-gray-200">
									<Link to="/donors">DONORS</Link>
								</li>
							</ul>
						</div>

						<div className="w-full lg:w-1/2 flex flex-col text-gray-400 lg:pl-2">
							<p className="py-4 text-2xl font-bold text-gray-300">
								CONTACT US
							</p>
							<p className="py-2">
								IX/627, Edamuttam <br></br>
								Palappetty, Kerala, India{" "}
							</p>
							<div className="py-2 float">
								{/* <svg
                xmlns='http://www.w3.org/2000/svg'
                height='1.5em'
                viewBox='0 0 512 512'
                className='stroke-gray-300 float-left'
              >
                <path d='M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z' />
              </svg> */}
								<p className="float-left">&nbsp;support@alphahospice.in</p>
							</div>
							<p className="py-2">+91 94977 13923</p>
						</div>
					</div>

					<div className="w-full lg:w-1/2 xl:w-1/3 text-gray-400">
						<p className="py-4 text-xl font-bold text-gray-300">
							Subscribe to our Newsletter
						</p>
						<p className="py-2">
							Subscribe our newsletter to get our latest updates & news.
						</p>
						<div className="flex flex-row relative">
							<input
								className="border-gray-500 border-2 py-2 pl-2 pr-10 w-full text-gray-300 bg-gray-700 "
								placeholder="Enter Email"
							/>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={3.5}
								stroke="currentColor"
								className="absolute w-6 h-6 right-2.5 top-2.5 text-gray-100 bg-red-700 font-bold"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M12 4.5v15m7.5-7.5h-15"
								/>
							</svg>
						</div>
					</div>
				</div>
			</div>
			<hr className="my-6 border-gray-400" />
			<div className="flex flex-wrap items-center md:justify-between justify-center">
				<div className="w-full md:w-4/12 px-4 mx-auto text-center">
					<div className="text-sm text-gray-400 font-semibold py-1 flex flex-col">
						<p className="pb-2">PRIVACY POLICY | TERMS OF USE | SITEMAP</p>
						<p>
							Copyright © {new Date().getFullYear()} by{" "}
							<em className="text-gray-100 hover:cursor-pointer">
								ALPHA HOSPICE
							</em>
							.
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
}
