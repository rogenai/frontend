export function Input(props: any) {
  return <input className={"rounded-full bg-white px-4 py-2 focus:outline-none text-black " + props.className} 
  placeholder={props.placeholder} onChange={props.onChange} />
}