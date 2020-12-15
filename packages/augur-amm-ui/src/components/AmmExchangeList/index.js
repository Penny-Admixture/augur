import React, { useState, useEffect } from 'react'
import { useMedia } from 'react-use'
import dayjs from 'dayjs'
import LocalLoader from '../LocalLoader'
import utc from 'dayjs/plugin/utc'
import { Box } from 'rebass'
import styled from 'styled-components'
import { Divider } from '../../components'
import { withRouter } from 'react-router-dom'
import TokenLogo from '../TokenLogo'
import { RowFixed, AutoRow } from '../Row'
import { useLPTokenBalances } from '../../state/wallet/hooks'
import { TYPE, StyledInternalLink, DisabledStyledLink } from '../../Theme'
import { greaterThanZero, getDisplayLiquidity, toPercent, formattedNum } from '../../utils'

dayjs.extend(utc)

const List = styled(Box)`
  -webkit-overflow-scrolling: touch;
`

const DashGrid = styled.div`
  display: grid;
  grid-gap: 0.25rem;
  grid-template-columns: 0.5fr 0.5fr 0.5fr 1fr 0.5fr 1.5fr;
  grid-template-areas: 'name';
  padding: 0 0.75rem;

  > * {
    justify-content: flex-end;

    :first-child {
      justify-content: flex-start;
      text-align: left;
      width: 20px;
    }
  }

  @media screen and (max-width: 800px) {
    padding: 0 0.75rem;
    grid-template-columns: 0.5fr 0.5fr 0.5fr 0.5fr 1.5fr;
    grid-template-areas: ' name';
  }

  @media screen and (min-width: 1080px) {
    padding: 0 0.75rem;
    grid-template-columns: 0.5fr 0.5fr 0.5fr 1fr 0.5fr 1fr 1fr 1.5fr;
    grid-template-areas: ' name';
  }

  @media screen and (min-width: 1200px) {
    grid-template-columns: 0.5fr 0.5fr 0.5fr 1fr 0.5fr 1fr 1fr 1.5fr;
    grid-template-areas: ' name';
  }
`

const ListWrapper = styled.div``

function AmmExchangeList({ allExchanges, disbaleLinks, marketId }) {
  const below600 = useMedia('(max-width: 600px)')
  const below740 = useMedia('(max-width: 740px)')
  const below800 = useMedia('(max-width: 800px)')
  const below1080 = useMedia('(max-width: 1080px)')
  const [userTokenBalances] = useLPTokenBalances()

  const ListItem = ({ ammExchange }) => {
    const [hasLPTokens, setHasLpTokens] = useState(false)
    const [liquidityUSD, setLiquidityUSD] = useState()

    useEffect(() => {
      if (userTokenBalances && ammExchange?.id) {
        setHasLpTokens(greaterThanZero(userTokenBalances[ammExchange.id]))
        setLiquidityUSD(getDisplayLiquidity(ammExchange))
      }
    }, [ammExchange])

    if (ammExchange) {
      return (
        <DashGrid style={{ height: '48px', alignItems: 'center' }} disbaleLinks={disbaleLinks} focus={true}>
          <TokenLogo size={below600 ? '16px' : '18px'} tokenInfo={ammExchange.cash.address} margin={!below740} />
          <TYPE.header area="name" fontWeight="500">
            {Number(ammExchange.priceYes).toFixed(2)}
          </TYPE.header>
          <TYPE.header area="name" fontWeight="500">
            {Number(ammExchange.priceNo).toFixed(2)}
          </TYPE.header>
          {!below800 && (
            <TYPE.header area="name" fontWeight="500">
              {liquidityUSD}
            </TYPE.header>
          )}
          <TYPE.header area="fee" fontWeight="500">
            {toPercent(ammExchange.feePercent)}
          </TYPE.header>
          {!below1080 && (
            <TYPE.header area="name" fontWeight="500">
              {formattedNum(ammExchange.volumeYesUSD, true)}
            </TYPE.header>
          )}
          {!below1080 && (
            <TYPE.header area="name" fontWeight="500">
              {formattedNum(ammExchange.volumeNoUSD, true)}
            </TYPE.header>
          )}
          <TYPE.header area="name" fontWeight="500">
            <RowFixed style={{ flexFlow: 'row nowrap', justifyContent: 'space-around', marginTop: '0.5rem' }}>
              <StyledInternalLink to={`/add/${marketId}/${ammExchange.cash.address}/${ammExchange.id}`}>
                Add
              </StyledInternalLink>
              {hasLPTokens && (
                <StyledInternalLink disabled={!hasLPTokens} to={`/remove/${marketId}/${ammExchange.id}`}>
                  Remove
                </StyledInternalLink>
              )}
              {!hasLPTokens && <DisabledStyledLink to="">Remove</DisabledStyledLink>}
              {ammExchange && ammExchange?.id && (
                <StyledInternalLink to={`/swap/${marketId}/${ammExchange.cash.address}/${ammExchange.id}`}>
                  Trade
                </StyledInternalLink>
              )}
              {!ammExchange || (!ammExchange?.id && <DisabledStyledLink  to="">Trade</DisabledStyledLink>)}
            </RowFixed>
          </TYPE.header>
        </DashGrid>
      )
    } else {
      return ''
    }
  }

  const exchangeList = allExchanges.map((exchange, index) => {
    return (
      exchange && (
        <div key={index}>
          <ListItem key={index} ammExchange={exchange} />
          <Divider />
        </div>
      )
    )
  })

  return (
    <ListWrapper>
      {allExchanges.length > 0 ? (
        <>
          <DashGrid
            center={true}
            disbaleLinks={disbaleLinks}
            style={{ height: 'fit-content', padding: '0 1.125rem 1rem 1.125rem' }}
          >
            <TYPE.header area="collateral"></TYPE.header>
            <TYPE.header area="YesPercent">Yes</TYPE.header>
            <TYPE.header area="NoPercent">No</TYPE.header>
            {!below800 && <TYPE.header area="liquidity">Liquidity</TYPE.header>}
            <TYPE.header area="liquidity">Fee %</TYPE.header>
            {!below1080 && <TYPE.header area="volumeYes">Yes Volume</TYPE.header>}
            {!below1080 && <TYPE.header area="volumeNo">No Volume</TYPE.header>}
            <TYPE.header area="uniswap"></TYPE.header>
          </DashGrid>
          <Divider />
          <List p={0}>{!exchangeList ? <LocalLoader /> : exchangeList}</List>
        </>
      ) : (
        <AutoRow justify={'center'}>
          <TYPE.light>No Exchanges Created</TYPE.light>
        </AutoRow>
      )}
    </ListWrapper>
  )
}

export default withRouter(AmmExchangeList)