"use client";

import assets from "@/assets";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Image from "next/image";
import { useRouter } from "next/navigation";
import * as React from "react";
import SwButton from "../SwButton";

interface Props {
  navItems?: { label: string; path: string; key: string }[];
}

export const TopNavbar = ({ navItems }: Props) => {
  const theme = useTheme();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const drawerWidth = 240;
  const [container, setContainer] = React.useState<HTMLElement | null>(null);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Image
        src={assets.images.appLogo}
        height={30}
        alt="Logo Simple Web"
        style={{ margin: "20px" }}
      />
      <Divider />
      <List>
        {navItems?.map((item) => (
          <ListItem key={item?.key} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }} onClick={() => router.push(item.path)}>
              <ListItemText primary={item?.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  React.useEffect(() => {
    setContainer(window?.document?.body);
  }, []);

  return (
    <>
      <AppBar component="nav">
        <Toolbar>
          <SwButton
            iconOnly
            variant="text"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none", color: "white" } }}
          >
            <MenuIcon />
          </SwButton>
          <Box flex={1} display="flex" justifyContent={{ xs: "flex-end", sm: "flex-start" }}>
            <SwButton variant="text" sx={{ p: 0 }}>
              <Image src={assets.images.appLogo} alt="Logo Simple Web" height={36} />
            </SwButton>
          </Box>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems?.map((item) => (
              <SwButton
                variant="text"
                key={item.key}
                sx={{ color: theme.palette.common.white }}
                onClick={() => router.push(item.path)}
              >
                {item.label}
              </SwButton>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          open={mobileOpen}
          variant="temporary"
          container={container}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </>
  );
};

export default TopNavbar;
