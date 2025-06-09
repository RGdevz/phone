import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import NiceAlert from "~/my-components/nice-alert"
import GenericDialog from "~/my-components/generic-dialog"
import Contact from "~/my-components/contact"
import { useGlobalStore } from "~/state"
import { useState } from "react"
import { PlusCircle, Users, Trash2 } from "lucide-react"
import { useAuth } from "~/hooks/useAuth"

export default function Groups() {

  const { groups, deleteGroup, addGroup, contacts } = useGlobalStore()
  const [newGroupName, setNewGroupName] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleAddGroup = () => {
    if (newGroupName.trim()) {
      addGroup(newGroupName.trim())
      setNewGroupName("")
      setDialogOpen(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddGroup()
    }
  }

  return (
    <div className="flex-1 bg-gray-50/50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-black tracking-tight">Groups</h1>
          <GenericDialog
            trigger={
              <Button size="lg" className="gap-2">
                <PlusCircle className="h-5 w-5" />
                New Group
              </Button>
            }
            title="Create New Group"
            description="Enter a name for your new group below."
            open={dialogOpen}
            onOpenChange={setDialogOpen}
            footer={
              <div className="flex gap-2 justify-end">
                <Button
                  variant="neutral"
                  onClick={() => setDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddGroup}
                  disabled={!newGroupName.trim()}
                >
                  Create Group
                </Button>
              </div>
            }
          >
            <Input
              placeholder="Enter group name"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full"
              autoFocus
            />
          </GenericDialog>
        </div>

        {groups.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 text-center">
            <h3 className="mt-2 text-xl font-semibold">No groups yet</h3>
            <p className="mt-1">Create your first group to get started</p>
            <Button
              onClick={() => setDialogOpen(true)}
              variant="neutral"
              className="mt-4"
            >
              Create a Group
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            {groups.map((group) => {
              const groupContacts = contacts.filter(contact => contact.group === group)
              
              return (
                <Card key={group} className="overflow-hidden h-[32rem] border-2">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        <CardTitle className="text-xl">{group}</CardTitle>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">
                          {groupContacts.length} {groupContacts.length === 1 ? 'contact' : 'contacts'}
                        </span>
                        <NiceAlert
                          message={`Are you sure you want to delete "${group}"?`}
                          onOk={() => deleteGroup(group)}
                        >
                          <Button 
                            variant="neutral" 
                            size="icon"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </NiceAlert>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0 overflow-auto h-[calc(32rem-4rem)]">
                    {groupContacts.length === 0 ? (
                      <div className="flex flex-col items-center justify-center p-6 text-center">
                        <p>No contacts in this group</p>
                      </div>
                    ) : (
                      <div className="divide-y">
                        {groupContacts.map((contact, index) => (
                          <Contact
                            key={contact.id}
                            {...contact}
                            className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}
                          />
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}