"use client";

import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { DarkModeToggle } from "@/components/DarkModeToggle";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Games", href: "/games" },
  { name: "Stories", href: "/stories" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      style={{
        background: "var(--kids-surface)",
        borderBottom: "2px solid var(--kids-border)",
      }}
    >
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
            <span className="sr-only">Mya's Short Stories</span>
            <span
              className="text-xl font-extrabold tracking-tight"
              style={{ color: "var(--kids-accent)" }}
            >
              ⭐ Mya's Short Stories
            </span>
          </a>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <DarkModeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
            style={{ color: "var(--kids-muted)" }}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>

        <div className="hidden lg:flex lg:gap-x-4 lg:items-center">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-bold px-4 py-2 rounded-full transition-opacity hover:opacity-80"
              style={{
                background: "var(--kids-accent-bg)",
                color: "var(--kids-accent-text)",
              }}
            >
              {item.name}
            </a>
          ))}
          <DarkModeToggle />
        </div>
      </nav>

      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-50" />
        <DialogPanel
          className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto p-6 sm:max-w-sm sm:ring-1"
          style={{
            background: "var(--kids-surface)",
            borderColor: "var(--kids-border)",
          }}
        >
          <div className="flex items-center justify-between">
            <a href="/" className="-m-1.5 p-1.5">
              <span
                className="text-lg font-extrabold"
                style={{ color: "var(--kids-accent)" }}
              >
                ⭐ Mya's Short Stories
              </span>
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5"
              style={{ color: "var(--kids-muted)" }}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>

          <div className="mt-6 flow-root">
            <div className="-my-6">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-2xl px-4 py-3 text-base font-bold transition-opacity hover:opacity-80"
                    style={{
                      color: "var(--kids-accent-text)",
                      background: "var(--kids-accent-bg)",
                    }}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
