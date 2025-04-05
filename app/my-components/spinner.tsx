import { cn } from "~/lib/utils"

interface p extends React.ComponentProps<'svg'>{
  size?:number
}

export default function LoadingSpinner (props:p){
   
  return(
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size || 24}
    height={props.size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("animate-spin", props.className)}
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
  )

  }