import { Button } from "~/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import type { ReactNode } from "react"

interface GenericDialogProps {
  trigger: ReactNode
  title: string
  description?: string
  children: ReactNode
  footer?: ReactNode
  className?: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function GenericDialog({
  trigger,
  title,
  description,
  children,
  footer,
  className = "sm:max-w-[425px]",
  open,
  onOpenChange
}: GenericDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>

      <DialogTrigger asChild>
      {trigger}
      </DialogTrigger>
      
      <DialogContent className={className}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && (
          <DialogDescription>
         {description}
          </DialogDescription>
          )}
        </DialogHeader>
        <div className="py-4">
          {children}
        </div>
        {footer && (
       <DialogFooter>
       {footer}
       </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
} 