import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import SidekickLogo from '@/shared/assets/icons/sidekick-logo.svg?react';
import { BurgerMenu } from './burger-menu';
import { AuthButtons } from './auth-buttons';
import { UserNav } from './user-nav';
import { NavBar } from './navbar';
import { ROUTES } from '@/shared/config/routes';
import { useAuth } from "@/entities/user/model/use-auth.tsx";

export interface HeaderProps {
  hiddenNav?: boolean;
}

export const MainHeader = ({ hiddenNav = false }: HeaderProps) => {
  const { isAuth } = useAuth();
  const [isNavBar, setIsNavBar] = useState(false);

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));   // ≥ 768px (если breakpoint переопределён)

  const toggleNavBar = () => setIsNavBar((prev) => !prev);

  return (
    <AppBar position="static" elevation={ 0 }>
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          height: { xs: 30, md: 68 },
          minHeight: { xs: '30px !important', md: '68px !important' },   // ⚠️ важно
          px: { xs: 1.5, md: 3 },
          fontFamily: 'var(--font-family-secondary), serif',
          bgcolor: 'var(--bg-primary)',
          display: 'flex',
          alignItems: 'center',
        }}
      >

        <Box
          component={ Link }
          to={ ROUTES.HOME }
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.75,
            color: 'var(--color-primary)',
            textDecoration: 'none',
            height: '100%',
          }}
        >
          <Box sx={{
            height: 24,
            '& svg': {
                width: { xs: 12, md: 24 },
                height: { xs: 12, md: 24 },
            },
          }}>
            <SidekickLogo/>
          </Box>
          <Typography component={'span'} sx={{letterSpacing:0, fontSize: { xs: 10, md: 16 }, fontFamily: 'inherit' }}>
            sidekick
          </Typography>
        </Box>

        { !hiddenNav && (
          <>
            { !isDesktop && <BurgerMenu onClick={ toggleNavBar }/> }

            { isDesktop && (isAuth ? <UserNav/> : <AuthButtons/>) }

            { isNavBar && <NavBar setNavBar={ () => setIsNavBar(false) }/> }
          </>
        ) }
      </Toolbar>
    </AppBar>
  );
};
