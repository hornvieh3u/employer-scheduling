import { lazy } from 'react';

const CalendarRoutes = [
    // Calendar
    {
        path: '/calendar',
        component: lazy(() => import('../../views/calendar')),
        exact: true
    },
    // Calendar
    {
        path: '/book',
        component: lazy(() => import('../../views/calendar/book')),
        exact: true
    },
    // Calendar
    {
        path: '/book/booking-type',
        component: lazy(() => import('../../views/calendar/book/booking-type')),
        exact: true
    },
    {
        path: '/book/add/:typeLink',
        component: lazy(() => import('../../views/calendar/book/add')),
        exact: true
    },
    {
        path: '/add-event',
        component: lazy(() =>
            import('../../views/calendar/event/add/AddEvent')
        ),
        exact: true
    },
    {
        path: '/edit-event/:eventId',
        component: lazy(() =>
            import('../../views/calendar/event/edit/EditEvent')
        ),
        exact: true
    },
    {
        path: '/add-new',
        component: lazy(() =>
            import('../../views/apps/reputation/schedule/scheduleboard')
        ),
        exact: true
    },
    {
        path: '/reputation/settings',
        component: lazy(() =>
            import('../../views/apps/reputation/settings')
        ),
        exact: true
    },
    {
        path: '/events',
        component: lazy(() => import('../../views/calendar/event')),
        exact: true
    },
    {
        path: '/event-details/:eventId',
        component: lazy(() =>
            import('../../views/calendar/event/EventDetails')
        ),
        exact: true
    },
    {
        path: '/add-guest/:eventId',
        component: lazy(() =>
            import('../../views/calendar/event/guests/AddGuest')
        ),
        exact: true
    },
    {
        path: '/event-preview/:eventId',
        component: lazy(() => import('../../views/calendar/event/preview')),
        exact: true
    }
]

export default CalendarRoutes;
