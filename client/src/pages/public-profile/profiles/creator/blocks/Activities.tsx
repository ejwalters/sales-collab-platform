import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { toAbsoluteUrl } from '@/utils';

import {
  ActivitiesAnniversary,
  ActivitiesBloggingConference,
  ActivitiesFollowersMilestone,
  ActivitiesInterview,
  ActivitiesNewArticle,
  ActivitiesUpcomingContent
} from '@/partials/activities/items';

const Activities = () => {
  const activities = [
    <ActivitiesNewArticle key="new-article" />,
    <ActivitiesInterview key="interview" />,
    <ActivitiesUpcomingContent key="upcoming" />,
    <ActivitiesBloggingConference
      key="conference"
      image={
        <Fragment>
          <img
            src={toAbsoluteUrl(`/media/illustrations/3.svg`)}
            className="dark:hidden max-h-[160px]"
            alt=""
          />
          <img
            src={toAbsoluteUrl(`/media/illustrations/3-dark.svg`)}
            className="light:hidden max-h-[160px]"
            alt=""
          />
        </Fragment>
      }
    />,
    <ActivitiesFollowersMilestone key="followers" />
  ];

  return (
    <div className="card h-full flex flex-col">
      <div className="card-header">
        <h3 className="card-title">Activities</h3>

        <div className="flex items-center gap-2">
          <label className="switch">
            <span className="switch-label">
              Auto refresh:&nbsp;
              <span className="switch-on:hidden">Off</span>
              <span className="hidden switch-on:inline">On</span>
            </span>
            <input type="checkbox" value="1" name="check" defaultChecked readOnly />
          </label>
        </div>
      </div>

      <div className="card-body">
        {activities.slice(0, 3)}
      </div>

      <div className="card-footer justify-center mt-auto">
        <Link to="/public-profile/activity" className="btn btn-link">
          All-time Activities
        </Link>
      </div>
    </div>
  );
};

export { Activities };
