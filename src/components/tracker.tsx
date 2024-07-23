import Script from "next/script";

export default function Tracker() {
    return ( <>
    <Script id="analytics1" async src="https://www.googletagmanager.com/gtag/js?id=G-DT7RTZTFLW"></Script>
    <Script id="analytics2">
      window.dataLayer = window.dataLayer || [];
      function gtag(){ (window as any).dataLayer.push(arguments) }
      gtag('js', new Date());

      gtag('config', 'G-DT7RTZTFLW');
    </Script>
    </>)
}