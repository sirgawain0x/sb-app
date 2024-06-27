import { useState } from "react";
import { useDHConnect } from "@daohaus/connect";
import styled from "styled-components";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTrigger,
  H1,
  ParMd,
  SingleColumnLayout,
} from "@daohaus/ui";
import { Link as RouterLink } from "react-router-dom";
import { APP_NAME, DEFAULT_CHAIN_ID } from "../utils/constants";
import { useYeeters } from "../hooks/useYeeters";
import { YeeterList } from "../components/YeeterList";
import {
  BigH1,
  SimpleCol,
  SimpleRow,
  Spacer,
} from "../components/Layout/Layout";
import { useLatestYeets } from "../hooks/useLatestYeets";
import { YeetMarquee } from "../components/YeetMarquee";
import { useMyYeeters } from "../hooks/useMyYeeters";
import { useRagequits } from "../hooks/useRagequits";
import { WideColumnLayout } from "../components/Layout/WideColumnLayout";

const LinkButton = styled(RouterLink)`
  text-decoration: none;
`;

const StyledDialogContent = styled(DialogContent)`
  z-index: 10;
`;

const Landing = () => {
  const { address } = useDHConnect();

  const { allYeeters, activeYeeters, upcomingYeeters, finishedYeeters } =
    useYeeters({ chainId: DEFAULT_CHAIN_ID });

  const { myYeeters } = useMyYeeters({
    chainId: DEFAULT_CHAIN_ID,
    account: address,
  });

  const { yeets } = useLatestYeets({ chainId: DEFAULT_CHAIN_ID });

  const { ragequits } = useRagequits({
    chainId: DEFAULT_CHAIN_ID,
  });

  const [mine, setMine] = useState(false);

  const hasMyYeeters = myYeeters.length > 0;

  console.log("activeYeetrs", activeYeeters);

  return (
    <>
      <WideColumnLayout
        subtitle={"Decentralized Fair Token Presales".toUpperCase()}
      >
        <div>
          <BigH1>{APP_NAME}</BigH1>
          <Spacer />
          <SimpleRow>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="lg">
                  WHAT IS THIS?
                </Button>
              </DialogTrigger>
              <StyledDialogContent
                title=" Welcome to fully dilluted, unruggable, fair launch
                    tokens"
              >
                <SimpleCol>
                  <ParMd>
                    * Create your token to kick off the 48-hour presale
                  </ParMd>
                  <ParMd>
                    * If the threshold is met, the presale will close, and a
                    Uniswap v3 liquidity pool will be initiated with the all ETH
                    raised in the presale. Your token will become available for
                    purchase on the marketplace.
                  </ParMd>
                  <ParMd>
                    * If the threshold is not met, the presale will close, and
                    contributors will be able to withdraw their contributions.
                  </ParMd>
                </SimpleCol>
              </StyledDialogContent>
            </Dialog>

            <LinkButton to="/summon/token">
              <Button variant="outline" size="lg">
                CREATE A TOKEN PRESALE
              </Button>
            </LinkButton>
          </SimpleRow>

          <Spacer />

          {yeets && allYeeters && (
            <YeetMarquee
              yeets={yeets}
              yeeters={allYeeters.slice(0, 5)}
              ragequits={ragequits}
              chainId={DEFAULT_CHAIN_ID}
            />
          )}

          <Spacer />
          <Spacer />
          <Spacer />

          {activeYeeters && (
            <YeeterList title="Active Presale" yeeters={activeYeeters} />
          )}

          {upcomingYeeters && (
            <YeeterList title="Upcoming Presale" yeeters={upcomingYeeters} />
          )}
          {finishedYeeters && (
            <YeeterList
              title="Completed Presale"
              yeeters={hasMyYeeters && mine ? myYeeters : finishedYeeters}
              canToggle={hasMyYeeters}
              toggle={mine}
              setToggle={setMine}
            />
          )}

          {/* <H6>My Yeeters</H6>

              {myYeeters && <YeeterList yeeters={myYeeters} />} */}
        </div>
      </WideColumnLayout>
    </>
  );
};

export default Landing;
