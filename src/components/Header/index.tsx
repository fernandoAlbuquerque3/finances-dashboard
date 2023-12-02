import React from 'react';
import * as S from './Header.styled'

export const Header: React.FC = () => {
   return (
      <S.SidebarContainer>
         <S.IconHeaderContainer>
            <S.MoneySvg />
         </S.IconHeaderContainer>

         <S.RouterLink to="/dashboard">
            <S.WalletSvg />
            Finanças
         </S.RouterLink>

         <S.RouterLink to="/new">
            <S.AddSvg />
            Adicionar
         </S.RouterLink>

         <S.RouterLink to="/profile">
            <S.UserSvg />
            Perfil
         </S.RouterLink>
      </S.SidebarContainer>
   )
}