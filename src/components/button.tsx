
export function Button(props: any) {
  return <button className={"rounded-full px-4 py-2 bg-[#9767FF] font-bold active:bg-[#6644af] focus:outline-none text-white " + props.className} onClick={props.onClick}>
    {props.placeholder}
  </button>
}

export function Link(props: any) {
  return <a className={"rounded-full px-4 py-2 bg-[#9767FF] font-bold active:bg-[#6644af] focus:outline-none text-white " + props.className} href={props.href}>
    {props.placeholder}
  </a>
}