import React, { useState } from 'react';
import {
  EVENT_EXPIRATION_TOOLTIP,
  SCALAR,
} from 'modules/common/constants';
import Styles from 'modules/market/components/core-properties/core-properties.styles.less';
import { PropertyLabel, TimeLabel } from 'modules/common/labels';
import {
  formatPercent,
  formatDai,
  formatRep,
  formatAttoRep,
} from 'utils/format-number';
import MarketScalarOutcomeDisplay from '../market-scalar-outcome-display/market-scalar-outcome-display';
import ChevronFlip from 'modules/common/chevron-flip';
import classNames from 'classnames';
import { MarketData } from 'modules/types';

interface CorePropertiesProps {
  market: MarketData;
  reportingBarShowing?: boolean;
  showExtraDetailsChevron?: boolean;
  onlyShowDates?: boolean;
}

// TODO: Get market 24 hour volume, currently just using volume
const CoreProperties: React.FC<CorePropertiesProps> = ({
  market,
  reportingBarShowing,
  showExtraDetailsChevron,
  onlyShowDates
}) => {
  const [showExtraDetails, setShowExtraDetails] = useState(false);
  const isScalar = market.marketType === SCALAR;
  return (
    <div
      className={classNames(Styles.CoreProperties, {
        [Styles.ReportingBarShowing]: reportingBarShowing,
        [Styles.OnlyShowDates]: onlyShowDates
      })}
    >
      <div
        className={classNames({ [Styles.ShowExtraDetails]: showExtraDetails })}
      >
        <div>
          <PropertyLabel
            label="Total Volume"
            value={
              market.volumeFormatted
                ? market.volumeFormatted.full
                : formatDai(0).full
            }
          />
          {reportingBarShowing && (
            <TimeLabel
              label="Event Expiration"
              time={market.endTimeFormatted.formattedShortUtc}
              hint={
                <>
                  <h4>{EVENT_EXPIRATION_TOOLTIP.header}</h4>
                  <p>{EVENT_EXPIRATION_TOOLTIP.content}</p>
                </>
              }
            />
          )}
          {reportingBarShowing && showExtraDetails && (
            <>
              <PropertyLabel
                label="Total Dispute Stake"
                value={
                  market.disputeInfo
                    ? formatAttoRep(market.disputeInfo.stakeCompletedTotal).full
                    : formatRep(0).full
                }
              />
              <TimeLabel
                label="Date Created"
                time={market.creationTimeFormatted.formattedShortUtc}
              />
            </>
          )}
          {(!reportingBarShowing || showExtraDetails) && !onlyShowDates && (
            <>
              <PropertyLabel
                label="Open Interest"
                value={
                  market.openInterestFormatted
                    ? market.openInterestFormatted.full
                    : formatDai(0).full
                }
              />
              <PropertyLabel
                label="24hr Volume"
                value={
                  market.volumeFormatted
                    ? market.volumeFormatted.full
                    : formatDai(0).full
                }
              />
              <PropertyLabel
                label="Market OI Fee"
                value={
                  market.settlementFeePercent
                    ? formatPercent(market.settlementFeePercent.formattedValue).full
                    : formatPercent(Number(market.settlementFee) * 100).full
                }
                hint={
                  <>
                    <h4>Market OI Fee</h4>
                    <p>
                      The Market OI Fee is a combination of the Market
                      Creator Fee (
                      <b>
                        {
                          formatPercent(
                            Number(market.marketCreatorFeeRate) * 100
                          ).full
                        }
                      </b>
                      ) and the Reporting Fee (
                      <b>
                        {
                          formatPercent(Number(market.reportingFeeRate) * 100)
                            .full
                        }
                      </b>
                      ): which occurs when shares are closed
                    </p>
                  </>
                }
              />
              {isScalar && reportingBarShowing &&
                <>
                  <PropertyLabel
                    label="Denomination"
                    value={market.scalarDenomination}
                  />
                  <PropertyLabel
                    label="Min"
                    value={market.minPrice}
                  />
                  <PropertyLabel
                    label="Max"
                    value={market.maxPrice}
                  />
                </>
              }
            </>
          )}
        </div>
        {!reportingBarShowing && (
          <div className={Styles.TimeSection}>
            <TimeLabel
              label="Date Created"
              time={market.creationTimeFormatted.formattedShortUtc}
            />
            <TimeLabel
              label="Event Expiration"
              time={market.endTimeFormatted.formattedLocalShortDateTimeWithTimezone}
              hint={
                <>
                  <h4>{EVENT_EXPIRATION_TOOLTIP.header}</h4>
                  <p>{EVENT_EXPIRATION_TOOLTIP.content}</p>
                </>
              }
            />
          </div>
        )}
        {reportingBarShowing && showExtraDetailsChevron && (
          <button onClick={() => setShowExtraDetails(() => !showExtraDetails)}>
            <ChevronFlip
              pointDown={showExtraDetails}
              stroke="#fff"
              filledInIcon
              quick
            />
          </button>
        )}
      </div>

      {!market.isWarpSync && isScalar &&
        (!reportingBarShowing || showExtraDetails) && (
          <div className={Styles.ScalarBox}>
            <MarketScalarOutcomeDisplay
              outcomes={market.outcomes}
              scalarDenomination={market.scalarDenomination}
              min={market.minPriceBigNumber}
              max={market.maxPriceBigNumber}
            />
          </div>
        )}
    </div>
  );
};

export default CoreProperties;
