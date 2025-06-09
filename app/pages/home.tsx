import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useGlobalStore } from "~/state";
import { Phone, Users, UserPlus, Search } from "lucide-react";
import { Card } from "~/components/ui/card";
import { Link } from "react-router";
import { useAuth } from "~/hooks/useAuth";

export default function Home() {

  const loggedIn = useAuth()
  if (!loggedIn) return null;

  const { contacts, groups } = useGlobalStore();
  const [isLoaded, setIsLoaded] = useState(false);


  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const stats = [
    {
      icon: <Phone className="h-6 w-6" />,
      label: "Total Contacts",
      value: contacts.length,
      bgColor: "bg-amber-100"
    },
    {
      icon: <Users className="h-6 w-6" />,
      label: "Groups",
      value: groups.length,
      bgColor: "bg-yellow-100"
    },
    {
      icon: <UserPlus className="h-6 w-6" />,
      label: "Favorites",
      value: contacts.filter(c => c.isFavorite).length,
      bgColor: "bg-orange-100"
    }
  ];

  const links = [
    {
      icon: <Search className="h-5 w-5" />,
      label: "Browse Contacts",
      description: "View and manage your contact list",
      href: "/contacts"
    },
    {
      icon: <Users className="h-5 w-5" />,
      label: "Manage Groups",
      description: "Organize your contacts in groups",
      href: "/groups"
    }
  ];

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-black mb-2">
            Welcome to Your Phone Book
          </h1>
          <p className="text-gray-600">
            Manage your contacts with ease
          </p>
        </motion.div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 lg:mx-30">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className={`p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 ${stat.bgColor}`}>
                <div className="flex items-center justify-center mb-4">
                  {stat.icon}
                </div>
                <div className="text-sm text-gray-600 mb-1">{stat.label}</div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.5 + (i * 0.1)
                  }}
                  className="text-3xl font-bold"
                >
                  {stat.value}
                </motion.div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quick Links Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-center ">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1000px] mx-auto">
            {links.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -20 }}
                transition={{ duration: 0.5, delay: 0.9 + (i * 0.1) }}
              >
                <Link viewTransition to={link.href} className="block">
                  <Card className="p-6 hover:scale-101 transition-all duration-300 cursor-pointer hover:bg-gray-50">
                    <div className="flex items-center gap-3 mb-2">
                      {link.icon}
                      <h3 className="font-semibold">{link.label}</h3>
                    </div>
                    <p className="text-gray-900">{link.description}</p>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}