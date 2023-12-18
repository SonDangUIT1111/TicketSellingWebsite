"use client";

import * as React from "react";
import { Heading } from "lucide-react";
import { LayoutGroup, motion } from "framer-motion";
import Link from "next/link";
import classnames from "classnames";
import * as Collapsible from "@radix-ui/react-collapsible";
import { usePathname } from "next/navigation";
import path from "path";
import { LuMenu } from "react-icons/lu";
import { Accordion, AccordionItem } from "@nextui-org/react";

type SidebarElement = React.ElementRef<"aside">;
type RootProps = React.ComponentPropsWithoutRef<"aside">;

interface NavItem {
  title: string;
  value: string;
  icon: React.ReactNode; // Icon component or SVG
}

interface SidebarProps extends RootProps {
  navItems: NavItem[];
  title?: string;
}

export const Sidebar = React.forwardRef<SidebarElement, Readonly<SidebarProps>>(
  ({ navItems, title, ...props }, forwardedRef) => {
    return (
      <aside
        ref={forwardedRef}
        className="px-6 min-w-[275px] max-w-[275px] flex flex-col gap-4 border-r border-slate-6 bg-white"
        {...props}
      >
        <nav className="flex flex-col gap-4">
          <Collapsible.Root defaultOpen>
            {navItems && navItems.length > 0 && (
              <>
                <Collapsible.Content className="relative mt-3 px-3 py-4 lg:block hidden">
                  {/* <div className="absolute left-2.5 w-px h-full bg-slate-6" /> */}

                  <div className="py-2 flex flex-col truncate space-y-2 font-medium">
                    <LayoutGroup id="sidebar">
                      {navItems.map((item) => {
                        const pathName = usePathname();
                        const lastPathname = pathName.split("/").pop();

                        const isCurrentPage = lastPathname === item.value;
                        return (
                          <Link
                            key={item.title}
                            href={`/user/${item.value}`}
                            className="hover:bg-gray-100 rounded-md h-12 flex items-center mx-2"
                          >
                            <motion.a
                              className={classnames(
                                "text-[14px] flex items-center font-medium gap-2 w-full h-10 rounded-md text-slate-11 relative transition ease-in-out duration-200",
                                {
                                  "text-white": isCurrentPage,
                                  "hover:text-slate-12": title !== item.title,
                                  "font-bold": isCurrentPage,
                                  "bg-blue-700": isCurrentPage,
                                }
                              )}
                            >
                              {isCurrentPage && (
                                <motion.span
                                  layoutId="sidebar"
                                  className="absolute left-0 right-0 top-0 bottom-0 rounded-md bg-cyan-5"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                >
                                  <div className="bg-cyan-11 w-px absolute top-1 left-2.5 h-6" />
                                </motion.span>
                              )}
                              {item.icon}
                              {item.title}
                            </motion.a>
                          </Link>
                        );
                      })}
                    </LayoutGroup>
                  </div>
                </Collapsible.Content>
                <Accordion>
                  <AccordionItem
                    key="anchor"
                    aria-label="Anchor"
                    disableIndicatorAnimation
                    className="lg:hidden block"
                    indicator={<LuMenu className="mr-6 w-6 h-6" />}
                  >
                    <Collapsible.Content className="relative px-3 py-4">
                      {/* <div className="absolute left-2.5 w-px h-full bg-slate-6" /> */}

                      <div className="py-2 flex flex-col truncate space-y-2 font-medium">
                        <LayoutGroup id="sidebar">
                          {navItems.map((item) => {
                            const pathName = usePathname();
                            const lastPathname = pathName.split("/").pop();

                            const isCurrentPage = lastPathname === item.value;
                            return (
                              <Link
                                key={item.title}
                                href={`/user/${item.value}`}
                                className="hover:bg-gray-100 rounded-md h-12 flex items-center mx-2"
                              >
                                <motion.a
                                  className={classnames(
                                    "text-[14px] flex items-center font-medium gap-2 w-full h-10 rounded-md text-slate-11 relative transition ease-in-out duration-200",
                                    {
                                      "text-white": isCurrentPage,
                                      "hover:text-slate-12":
                                        title !== item.title,
                                      "font-bold": isCurrentPage,
                                      "bg-blue-700": isCurrentPage,
                                    }
                                  )}
                                >
                                  {isCurrentPage && (
                                    <motion.span
                                      layoutId="sidebar"
                                      className="absolute left-0 right-0 top-0 bottom-0 rounded-md bg-cyan-5"
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      exit={{ opacity: 0 }}
                                    >
                                      <div className="bg-cyan-11 w-px absolute top-1 left-2.5 h-6" />
                                    </motion.span>
                                  )}
                                  {item.icon}
                                  {item.title}
                                </motion.a>
                              </Link>
                            );
                          })}
                        </LayoutGroup>
                      </div>
                    </Collapsible.Content>
                  </AccordionItem>
                </Accordion>
              </>
            )}
          </Collapsible.Root>
        </nav>
      </aside>
    );
  }
);

Sidebar.displayName = "Sidebar";
