import { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { KeenIcon } from '@/components';
import { Container } from '@/components/container';
import { UserProfileHero } from '@/partials/heros';
import { Navbar, NavbarActions, NavbarDropdown } from '@/partials/navbar';
import { PageMenu } from '@/pages/public-profile';
import { DealOverviewContent } from '@/pages/DealOverviewContent';

const DealOverviewPage = () => {
  const { dealId } = useParams();

  const image = (
    <div className="flex items-center justify-center rounded-full border-2 border-success-clarity size-[100px] shrink-0 bg-light">
      <KeenIcon icon="briefcase" className="size-[50px]" />
    </div>
  );

  return (
    <Fragment>
      <UserProfileHero
        name={dealId?.replace(/-/g, ' ')}
        image={image}
        info={[
          { label: 'Deal Stage: Discovery', icon: 'abstract-41' },
          { label: 'Value: $50,000', icon: 'dollar' },
          { label: 'Owner: John Doe', icon: 'user' }
        ]}
      />

      <Container>
        <Navbar>
          <PageMenu />
          <NavbarActions>
            <button type="button" className="btn btn-sm btn-primary">
              <KeenIcon icon="edit" /> Edit Deal
            </button>
            <NavbarDropdown />
          </NavbarActions>
        </Navbar>
      </Container>

      <Container>
        <DealOverviewContent />
      </Container>
    </Fragment>
  );
};

export { DealOverviewPage };