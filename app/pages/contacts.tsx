
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import Contact from "~/my-components/contact-card";
import AddContactDialog from "~/my-components/add-contact";
import { resetContacts, useGlobalStore } from "~/state";
import {   useMemo, useState } from "react";
import NiceAlert from "~/my-components/nice-alert";
import { Command, CommandEmpty, CommandInput, CommandList } from "~/components/ui/command";
import { type MyGroupEnum, myGroups } from "~/constants";
import { X, Star, ChevronDown } from "lucide-react";
import { cn } from "~/lib/utils";



export default function Home() {


  const {contacts, groups,setContacts,role} = useGlobalStore()
  const [search, setSearch] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<MyGroupEnum>('')
  const [showFavorites, setShowFavorites] = useState(false)
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)

  const filteredContacts = useMemo(() => {
    let results = contacts.filter(Boolean).toSorted((a,b)=>a.name?.localeCompare(b.name))
    
    // Apply search filter
    results = results.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) || c.phone?.includes(search)
    )
    
    // Apply group filter
    if (selectedGroup){
      results = results.filter(x=>x.group == selectedGroup)
    }
    
    // Apply favorites filter
    if (showFavorites) {
      results = results.filter(x => x.isFavorite)
    }
    
    return results
  }, [contacts, search, selectedGroup, showFavorites]);



  const FiltersContent = () => (
    <div className="flex flex-col gap-2">
      <Button
        variant="neutral"
        onClick={() => setShowFavorites(!showFavorites)}
        className={cn(
          "flex items-center gap-2 px-4 py-2",
          showFavorites && "bg-amber-100 hover:bg-amber-200"
        )}
      >
        <Star className={cn("h-5 w-5", showFavorites ? "fill-amber-400 text-amber-400" : "text-gray-400")} />
        <span>Show only Favorites</span>
      </Button>

      <h4 className="text-lg font-bold py-2">Groups</h4>

      {groups.map((group, i) => (
        <Button
          key={i}
          variant="neutral"
          className={`w-full py-4 justify-start text-left font-medium transition-colors ${
            selectedGroup === group 
           ? 'bg-amber-100 hover:bg-amber-200' 
           : 'hover:bg-gray-100'
          }`}
          onClick={() => {
            setSelectedGroup(group === selectedGroup ? '' : group)
          }}
        >
          {group}
        </Button>
      ))}
    </div>
  );


  
  return (
    <div className=" flex-1 bg-gray-50/50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-black text-center mb-8">Phone Book</h1>
        
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column - Groups and Actions */}
          <div className="col-span-12 lg:col-span-3">
            <div className="flex flex-col gap-4">
              {/* Mobile Filters */}
              <div className="lg:hidden">
                <button
                  onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                  className="w-full flex items-center justify-between p-4 bg-amber-200 rounded-lg hover:bg-amber-300 transition-colors"
                >
                  <span className="text-lg font-bold">Filters</span>
                  <ChevronDown className={cn("h-5 w-5 transition-transform", isFiltersOpen && "rotate-180")} />
                </button>
                
                <div className={cn(
                  "overflow-hidden transition-all duration-300 ease-in-out",
                  isFiltersOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                )}>
                  <Card className="mt-2 border-amber-200">
                    <CardContent className="pt-6">
                   <FiltersContent />
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              {/* Desktop Filters */}
              <Card className="py-10 bg-amber-200 hidden lg:block">
                <CardHeader>
                  <CardTitle className="text-xl font-bold">Filters</CardTitle>
                </CardHeader>
                <CardContent>
                  <FiltersContent />
                </CardContent>
              </Card>

              {/* Admin Action Buttons */}


           {role == 'admin' && (
              <div>
              <div className="flex flex-col gap-3">
                <AddContactDialog>
                  <Button className="w-full py-3 bg-orange-100 hover:bg-orange-200">
                    Add Contact
                  </Button>
                </AddContactDialog>

                <NiceAlert message="Are you sure you want to reset to default all contacts?" onOk={()=>resetContacts()}>
                  <Button className="w-full py-3 bg-amber-50 hover:bg-amber-100">
                    Reset Contacts
                  </Button>
                </NiceAlert>


                   <NiceAlert message="Are you sure you want to reset all contacts?" onOk={()=>setContacts([])}>
                  <Button className="w-full py-3 bg-red-300">
                    Delete all contacts
                  </Button>
                </NiceAlert>

              </div>
              </div>
            )}

            </div>
          </div>
          


          {/* Right Column - Contacts */}
          <div className="col-span-12 lg:col-span-9 ">
            <div className="flex flex-col gap-4">
              <div className="flex gap-4 items-center">
                <Command className="p-3 flex-1">
                  <CommandInput 
                  className="placeholder-black" 
                  onValueChange={v=>setSearch(v)} 
                  placeholder="Search contacts..." 
                  />
                </Command>
              </div>

              {/* Filter Indicators */}
              {(showFavorites || selectedGroup) && (
                <div className="flex items-center gap-2 px-2">
                  {showFavorites && (
                    <div className="bg-amber-100 px-3 py-1 rounded-full flex items-center gap-2">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="font-medium">Showing favorites</span>
                      <Button
                     variant="neutral"
                     size="icon"
                     className="h-5 w-5 rounded-full hover:bg-amber-200"
                     onClick={() => setShowFavorites(false)}>
                     <X className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                  
                  {selectedGroup && (
                    <div className="bg-amber-100 px-3 py-1 rounded-full flex items-center gap-2">
                      <span className="font-medium">{selectedGroup}</span>
                      <Button
                        variant="neutral"
                        size="icon"
                        className="h-5 w-5 rounded-full hover:bg-amber-200"
                        onClick={() => setSelectedGroup('')}
                      >
                      <X className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>
              )}



              <Card className="min-h-[300px] lg:min-h-auto overflow-y-auto max-h-[calc(100vh-16rem)] my-scroll py-0 more-shadow overflow-x-hidden flex flex-col gap-0 bg-white lg:p-3">
                {filteredContacts.length === 0 && (
                <div className="text-center p-8 text-gray-500">
                No contacts found
                </div>
                )}

                {filteredContacts.map((contact, i) => (
                <Contact key={contact.id}  {...contact} className={i % 2 !== 0 ? 'bg-amber-50' : ''}
                />
                ))}

              </Card>


            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
