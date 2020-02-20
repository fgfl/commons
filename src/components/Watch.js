import React from "react";
import CategoryDropdown from "./CategoryDropdown";
import BillCard from "./Bill";
import FindMyMp from "./FindMyMp";
import Container from "@material-ui/core/Container";

const Watch = props => {
  return (
    <div>
      <Container maxWidth="sm">
        <CategoryDropdown />
        <BillCard />
      </Container>
      <FindMyMp />
    </div>
  );
};
export default Watch;
