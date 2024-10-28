import TopNavbar from "@/components/SwNavbar/TopNavbar";
import { Box, Stack } from "@mui/material";
import { ReactNode } from "react";

const MainLayout = ({ children }: { children: ReactNode }) => {
  const dummyTopNavItems = [
    { label: "Home", path: "/", key: "home" },
    { label: "Favorites", path: "/anime/favorites", key: "favorites" },
  ];
  return (
    <Stack direction="column">
      <TopNavbar navItems={dummyTopNavItems} />
      <Box marginTop={8}>{children}</Box>
    </Stack>
  );
};

export default MainLayout;
