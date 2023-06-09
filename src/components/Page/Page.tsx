import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { FC, PropsWithChildren, useContext, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { FrameContext, FrameContextProps } from "@components/Frame/Frame";
import useAuthInfo from "@hooks/useAuthInfo";
export interface PageProps {
  title: string;
}

const Page: FC<PropsWithChildren<PageProps>> = (props) => {
  const { title, children } = props;
  const { handleDrawerToggle } = useContext<FrameContextProps>(FrameContext);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { user, logout } = useAuthInfo();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
      }}
    >
      <AppBar position="sticky">
        <Toolbar>
          <Box
            sx={{ flexGrow: 1, display: { xs: "flex" }, alignItems: "center" }}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              {title}
            </Typography>
          </Box>
          <Box>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar src={user?.photoUrl}>
                  {!user?.photoUrl ? user?.name[0] : ""}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem sx={{ px: 3 }} onClick={handleCloseUserMenu}>
                <Typography textAlign="center" onClick={logout}>
                  logout
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center"></Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 3 }}>{children}</Box>
    </Box>
  );
};

export default Page;
