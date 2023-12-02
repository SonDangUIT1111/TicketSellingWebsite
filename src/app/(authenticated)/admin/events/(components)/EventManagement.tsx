"use client";

import React, { useState } from "react";
import EventListComponent from "./EventListComponent";
import SearchAndCreateBar from "./SearchAndCreateBar";

export function EventManagement({ session }) {
  const [searchWord, setSearchWord] = useState("");

  return (
    <>
      <SearchAndCreateBar setSearchWord={setSearchWord} />
      <EventListComponent props={searchWord} />
    </>
  );
}
