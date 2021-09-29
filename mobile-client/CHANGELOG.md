## [0.22.1](https://github.com/RBrNx/wedding-project/compare/v0.22.0...v0.22.1) (2021-09-29)


### Bug Fixes

* add variables when refetching bootstrap query ([0ad992c](https://github.com/RBrNx/wedding-project/commit/0ad992cbbcc8b9c5faacd9827321e7b4ee72b194))
* only set menu if it is not empty ([ef3a605](https://github.com/RBrNx/wedding-project/commit/ef3a6057ff22c51246b0bd563a5d268fa3cffa91))

# [0.22.0](https://github.com/RBrNx/wedding-project/compare/v0.21.0...v0.22.0) (2021-09-27)


### Bug Fixes

* hide Loader indicator on SplashScreen if app is ready ([669b12a](https://github.com/RBrNx/wedding-project/commit/669b12a54b3fb92eb1fbdc007f0383d4851e60b3))
* QuestionCard now only uses margin-bottom for spacing ([06a8bf3](https://github.com/RBrNx/wedding-project/commit/06a8bf3a12550bb0f5de2c00e3e17592ee7d6d8d))
* remove blurHash from bootstrapQuery ([f0af625](https://github.com/RBrNx/wedding-project/commit/f0af625d60aa7d665e399664a928c994a09cfe72))


### Features

* add error messages to FormInput ([0b7d4a6](https://github.com/RBrNx/wedding-project/commit/0b7d4a65963ad5386358155cead83c98de513761))
* add error state to StandardTextInput and StandardSelectInput ([f76d851](https://github.com/RBrNx/wedding-project/commit/f76d851937c26c0e3b3915c50f6762eb8578d34e))
* add loading indicator to AnimatedSplashScreen ([52d6aa5](https://github.com/RBrNx/wedding-project/commit/52d6aa5137bbeab4f028774f9da73b7b3c9b948b))
* add support for StandardEnumSelect and Switch inputs to FormInput component ([d8e1da7](https://github.com/RBrNx/wedding-project/commit/d8e1da7ecacc2e461efe67db0516727911e7af8b))
* add support for StandardSelectInput to FormInput and remove @gorham/bottom-sheet v4 code ([11e809e](https://github.com/RBrNx/wedding-project/commit/11e809e606fbea73589255c454d457e2a329575b))
* add validation rules to EditQuestionSheet ([4ce054d](https://github.com/RBrNx/wedding-project/commit/4ce054d7e50c10eea127b41a50b6dbd331a61f9c))
* add validation, maxLength and keyboardType to all react-hook-form sheets ([246d19e](https://github.com/RBrNx/wedding-project/commit/246d19e13dd7c2ae36dcfd5f17179c1e8587185c))
* allow FormInput component to handle keyboard events with BottomSheets ([acd3c47](https://github.com/RBrNx/wedding-project/commit/acd3c47f5c1de0b1dd827647231acc127da44ec3))
* create stripTypenames util function to remove '__typename' from a GQL query's data ([19fd467](https://github.com/RBrNx/wedding-project/commit/19fd46700f9f9db310f77c911e92abcdf54f6c86))
* implement react-hook-form in CreateInvitationSheet ([b80be64](https://github.com/RBrNx/wedding-project/commit/b80be642bcb1251ceccedbba71ad6194f30548a7))
* implement react-hook-form into EditSchedule and EditVenue sheets ([7f1fa3e](https://github.com/RBrNx/wedding-project/commit/7f1fa3ef032fcd60f207586f4df0fde040303920))
* move EnumLabel component into Library and create StandardEnumSelect component ([a62c9e1](https://github.com/RBrNx/wedding-project/commit/a62c9e1ebb9edec08d4d1c7332ecd0a15ac37749))
* replaced manual initilisation of snapPoints with the useSnapPoints hook ([ae349e9](https://github.com/RBrNx/wedding-project/commit/ae349e9ae15df77d06304a3a6cb8c736d485c689))

# [0.21.0](https://github.com/RBrNx/wedding-project/compare/v0.20.3...v0.21.0) (2021-09-12)


### Features

* create api and mobile workflows for production ([ff6a1c6](https://github.com/RBrNx/wedding-project/commit/ff6a1c6bcef0f7108f59d8386dca0e2228bf3f11))
* update app.json with production values ([f7a93d6](https://github.com/RBrNx/wedding-project/commit/f7a93d63657701ffaa7a0598e6301b817a9e7c4b))

## [0.20.3](https://github.com/RBrNx/wedding-project/compare/v0.20.2...v0.20.3) (2021-09-08)


### Bug Fixes

* add missing getCurrentUser _id value to boostrapQuery to stop memory uploads crashing ([8abdc77](https://github.com/RBrNx/wedding-project/commit/8abdc771b779eba492828bf92aaf4edb6bb60bc6))
* throw error if invitation can't be found ([a03105f](https://github.com/RBrNx/wedding-project/commit/a03105fad819a54469b3932724e85dd455330661))

## [0.20.2](https://github.com/RBrNx/wedding-project/compare/v0.20.1...v0.20.2) (2021-09-07)


### Bug Fixes

* add Google Maps API Keys for Android & iOS ([f210305](https://github.com/RBrNx/wedding-project/commit/f21030504c4ca6f0cd024f9b55f31e74e969861d))
* allow qr code to be rescanned if GuestSignInSheet is dismissed ([c8f8161](https://github.com/RBrNx/wedding-project/commit/c8f8161afaaba2446cfb5e8329acc22d9eb05b05))
* Barcodes can now be scanned on iOS ([0a97c40](https://github.com/RBrNx/wedding-project/commit/0a97c40ae03d0af637b4247e839f898b2eabd7fe))
* re-enable GoogleMapsView ([840a105](https://github.com/RBrNx/wedding-project/commit/840a10587e3ea351a3e54d2911a659a9474481c9))

## [0.20.1](https://github.com/RBrNx/wedding-project/compare/v0.20.0...v0.20.1) (2021-09-05)


### Bug Fixes

* eslint errors ([ba2dc21](https://github.com/RBrNx/wedding-project/commit/ba2dc21ebfe32520db5ea08767e679313d656c23))
* Outline text colour is now correct ([8231332](https://github.com/RBrNx/wedding-project/commit/8231332d9c91964cf6d09919aed3b0bc1204da5d))
* temporarily remove Notifications and Maps code as they are breaking in Production ([8ff2f93](https://github.com/RBrNx/wedding-project/commit/8ff2f9338ec9262542650f6f0cfcca55c4c1355a))

# [0.20.0](https://github.com/RBrNx/wedding-project/compare/v0.19.1...v0.20.0) (2021-09-03)


### Bug Fixes

* update invitationRegex to account for /invite/ path ([9680bf0](https://github.com/RBrNx/wedding-project/commit/9680bf04504b5f8f5d794db9d4bd4a48e9cbb843))


### Features

* create initial version of copyMemories script ([16c4a15](https://github.com/RBrNx/wedding-project/commit/16c4a15935b58a953dd8c56cd99fee3282cef3a2))

## [0.19.1](https://github.com/RBrNx/wedding-project/compare/v0.19.0...v0.19.1) (2021-08-26)


### Bug Fixes

* change addVenueDetails input type to AddVenueDetailsInput ([56ec994](https://github.com/RBrNx/wedding-project/commit/56ec994a6f2e27d890c0eb7e94b645bc46e8df62))
* change StandardButton text colour when outline is set to true ([56d53c3](https://github.com/RBrNx/wedding-project/commit/56d53c30f0525d5a6decb66e457e6bd1afaf3e58))

# [0.19.0](https://github.com/RBrNx/wedding-project/compare/v0.18.0...v0.19.0) (2021-08-24)


### Bug Fixes

* add invitationId to createGuest typedef ([3b622ca](https://github.com/RBrNx/wedding-project/commit/3b622ca175a85e367a51abb8c09a403ed84e3464))
* avoid app crashing if venue, schedule or menu properties are null ([29856db](https://github.com/RBrNx/wedding-project/commit/29856db9be03a2d6e2327dd75abeb9da42435ca7))
* avoid errors when venue or image don't exist ([09313c4](https://github.com/RBrNx/wedding-project/commit/09313c4934a88cbeb02188ac882c0e6d7c73c8d5))
* await createGuestUser ([01ac374](https://github.com/RBrNx/wedding-project/commit/01ac374140716a7cbfe7561b40aae7766a376098))
* eslint issue in ReText ([ffc7712](https://github.com/RBrNx/wedding-project/commit/ffc7712b0040033b59691aac837b4d277a1f33c6))
* eslint issues ([7a48f7d](https://github.com/RBrNx/wedding-project/commit/7a48f7d80e294dd824b0dd048e7772c1839f5ded))
* reset state in EditVenueSheet ([c21c837](https://github.com/RBrNx/wedding-project/commit/c21c8377deca24422e78d22609ac75cb03ffe9e4))


### Features

* add ability to add/edit schedule details ([9432a46](https://github.com/RBrNx/wedding-project/commit/9432a46817fcf4b5b2305c9887abc78158f37236))
* add ability to navigate to Details screen from Dashboard ([6996a1d](https://github.com/RBrNx/wedding-project/commit/6996a1df3c0825ac55d1596ac58b40c7bd674d08))
* add bottomSheetShadow to outlines.js ([e2db3e0](https://github.com/RBrNx/wedding-project/commit/e2db3e040ffb4f4384fd55ea121ef1ba245185ef))
* add icon prop to StandardPillPressable ([3899a5f](https://github.com/RBrNx/wedding-project/commit/3899a5fac273f6d70a4b6f4c4981b122631a82f2))
* add LocalTime scalar and resolver ([08574ca](https://github.com/RBrNx/wedding-project/commit/08574ca53b7866fd775a3b639519befe2471cc9f))
* add Menu to Event schema and typedefs ([6c7011b](https://github.com/RBrNx/wedding-project/commit/6c7011b92b9b37ef045062534136bd63cde712c1))
* add PhoneNumber scalar and resolver ([03e39eb](https://github.com/RBrNx/wedding-project/commit/03e39eb4b04162bfa027877456c5dfc1870a0374))
* add venue details to Event model and typedefs, along with retreiving venue image via a signed url ([4543356](https://github.com/RBrNx/wedding-project/commit/45433568e7edba50cd04287c01786789177102ef))
* create addMenuDetails mutation resolver ([1b1a650](https://github.com/RBrNx/wedding-project/commit/1b1a65000eb3d6b69f5d6903c943217c85e64829))
* create addScheduleDetails mutation resolver ([26cdd66](https://github.com/RBrNx/wedding-project/commit/26cdd66cff076418cc93129fab5bb766f5596eb6))
* create DetailsIllustration component ([f13941e](https://github.com/RBrNx/wedding-project/commit/f13941ee13d829819806dacea4eb3cc96b2ae3c6))
* create EditMenuCard, EditScheduleCard and EditVenueCard components to enable admins to add the relevant details ([3d224cd](https://github.com/RBrNx/wedding-project/commit/3d224cda8f0dfba3d00e7b1a95b5b6b4e876f88f))
* create EditMenuSheet to allow admin to add/edit the Wedding Menu ([28680ab](https://github.com/RBrNx/wedding-project/commit/28680ab4aa1e180b7e83e2d2e210b4542489a001))
* create GoogleMapsView component ([2fd5a39](https://github.com/RBrNx/wedding-project/commit/2fd5a3977c770be12344d8bb37dc2d6ee4840934))
* create initial version of DetailsList and DetailsScreen ([9fbbdd7](https://github.com/RBrNx/wedding-project/commit/9fbbdd7e8ed7d5a3841012c46679308713c9be27))
* create useSnapPoints hook ([de93f3d](https://github.com/RBrNx/wedding-project/commit/de93f3d191f12f6a4ee90f0219b311897b9ce007))
* create WeddingMenu component ([78c111d](https://github.com/RBrNx/wedding-project/commit/78c111d3cfbfd92da4ccf8575eb6367eacd3845d))
* create WeddingSchedule component ([be382bd](https://github.com/RBrNx/wedding-project/commit/be382bd34f5796e758c78012aa3f23d021652a4c))
* created EditVenueSheet and addVenueDetails mutation ([d06337f](https://github.com/RBrNx/wedding-project/commit/d06337f2f2f20bf3a47bb79c04bcaac45e06932e))
* created ScheduleSchema and added it to the Event typedefs ([f9e3ad5](https://github.com/RBrNx/wedding-project/commit/f9e3ad599549ad973eaea01b98e3e4bce6c8a23a))
* display Menu in EditMenuCard ([9613d15](https://github.com/RBrNx/wedding-project/commit/9613d156b8f4549cf5054364067ac423786d74c4))
* display schedule in EditScheduleCard ([e7e9a6e](https://github.com/RBrNx/wedding-project/commit/e7e9a6ea3c930cb698afc5b2638745cc6b2d6634))
* first attempt at EditDetailsView and EditDetailsScreen ([b0d9e44](https://github.com/RBrNx/wedding-project/commit/b0d9e441ada3d5c34ca6424f72b21d0f2e5e47c0))
* load venue information from api ([3381aef](https://github.com/RBrNx/wedding-project/commit/3381aefb878d3c5ef77622d30ae4c30a5c8b6031))
* load wedding menu from graphql api ([9312443](https://github.com/RBrNx/wedding-project/commit/93124430d187a9a8d8644317233e4e066a4a1eac))
* load wedding schedule from graph api ([974e9e2](https://github.com/RBrNx/wedding-project/commit/974e9e29b5427a0e0125e2d2aef4c1c92fecf697))
* move VenueMap into VenueDetails component and remove DetailsList in favour of having DetailsScreen be a scrollview and it's styling now more closely matches the rest of the app ([6038e54](https://github.com/RBrNx/wedding-project/commit/6038e540e2257b78bd9e9672cbd8a70ebc128fea))
* replace DetailsIllustration ([fec34da](https://github.com/RBrNx/wedding-project/commit/fec34da685dfe0a20d82df0eb348a3039f2f525e))
* Venue details can now be added or edited by clicking on the EditVenueCard ([1d00872](https://github.com/RBrNx/wedding-project/commit/1d00872330812b8f75a9af2b1c342759d10197b8))

# [0.18.0](https://github.com/RBrNx/wedding-project/compare/v0.17.2...v0.18.0) (2021-08-09)


### Bug Fixes

* move songRequestAnswer and spotifyConfig declarations into an if statement to avoid undefined errors ([8175eec](https://github.com/RBrNx/wedding-project/commit/8175eec1ff50fb2eb47d3f92e674697ddf793033))
* trim email address before sign in ([28d4e93](https://github.com/RBrNx/wedding-project/commit/28d4e932b0fc93de0901df62bd3001dcb01c644c))


### Features

* add ability to add a plus one to a guest ([1d52774](https://github.com/RBrNx/wedding-project/commit/1d52774142b140914303ab60e1f5848223fced71))
* add hasPlusOne boolean to CreateUserInput ([204e198](https://github.com/RBrNx/wedding-project/commit/204e198f114a2562bdb359dc66780cd05b25e00b))
* add hasPlusOne support to createInvitationGroup ([0b95ad7](https://github.com/RBrNx/wedding-project/commit/0b95ad7ec3048848e50cc00fe16c47ed9709403d))
* added getEventInfo resolver and split event typedefs & resolvers into auth/unauth ([6f0c417](https://github.com/RBrNx/wedding-project/commit/6f0c41772077c4ca3870158b56bf2ca5c8709acd))
* replaced getCurrentUser query with bootstrapQuery which will also fetch event info ([3543be4](https://github.com/RBrNx/wedding-project/commit/3543be47e456ff28359a428cb71425a6e7d1f193))
* show event date in RSVPCard ([5b02917](https://github.com/RBrNx/wedding-project/commit/5b02917b168794b08d4ee7f9e498f8b54c867497))

## [0.17.2](https://github.com/RBrNx/wedding-project/compare/v0.17.1...v0.17.2) (2021-08-07)


### Bug Fixes

* send guestType when creating a new question ([b67ea5b](https://github.com/RBrNx/wedding-project/commit/b67ea5b2558532b86cdf158f3a2ed4428df106a4))

## [0.17.1](https://github.com/RBrNx/wedding-project/compare/v0.17.0...v0.17.1) (2021-08-06)


### Bug Fixes

* stop app crashing when signing out ([135fd20](https://github.com/RBrNx/wedding-project/commit/135fd20c7ecfc80b93ad6f882cbac26aa8b69d34))

# [0.17.0](https://github.com/RBrNx/wedding-project/compare/v0.16.0...v0.17.0) (2021-08-06)


### Bug Fixes

* currentUser should no longer contain stale data when signing out and in ([cd070ea](https://github.com/RBrNx/wedding-project/commit/cd070eafee4bfb28e045cd28c7a9f4590b3bc8f9))
* dismiss question sheet before resetting state ([bcbfdb5](https://github.com/RBrNx/wedding-project/commit/bcbfdb572c2bd8cca71715857bfa123b78821b26))
* getRSVPQuestion no longer filters questions if the user is an admin. InvitationType is now also fetched from the invitation rather than the user ([34d9f73](https://github.com/RBrNx/wedding-project/commit/34d9f73c97b335a49b0e20d4114722751442f106))
* reset invitationType on dismiss ([93be956](https://github.com/RBrNx/wedding-project/commit/93be956223a354f379b68a6ea8a895a54da06ef9))
* rsvp questions are now sorted in the correct order before working out which question should come next ([2528ef6](https://github.com/RBrNx/wedding-project/commit/2528ef68b88a9d2be347824d3b218f18d9dde8ca))
* unique code is now selectable and guests name is centered correctly ([c056497](https://github.com/RBrNx/wedding-project/commit/c056497b75a438e494915a61a64c51bfb2329cda))


### Features

* if only one set of credentials is returned from fetchGuestCredentials, automatically log them in ([9643bcc](https://github.com/RBrNx/wedding-project/commit/9643bcc1e26b920124f5363eeba72def317343b7))

# [0.16.0](https://github.com/RBrNx/wedding-project/compare/v0.15.0...v0.16.0) (2021-08-06)


### Bug Fixes

* generatePassword will now make sure that at least 1 number and 1 letter are generated ([6f4bdd4](https://github.com/RBrNx/wedding-project/commit/6f4bdd41aac0d74c50743771d70fe791049e23f2))
* MemoriesGrid should no longer crash when data.getMemoryAlbums is undefined ([4706c07](https://github.com/RBrNx/wedding-project/commit/4706c0789d42babd4985fbf93acbf3a159a54670))


### Features

* add ability to delete an Invitation ([095056f](https://github.com/RBrNx/wedding-project/commit/095056f1f3f5c0a6024f2430bea122a745e29f57))
* add createInvitationGroup and deleteInvitationGroup resolvers and fetchTempLoginCredentials now returns multiple guests attached to a single InvitationGroup ([ed645ac](https://github.com/RBrNx/wedding-project/commit/ed645ac5693fa97baffbbd75fe727e48f9681b18))
* add eventId to InvitationGroup model ([74836ba](https://github.com/RBrNx/wedding-project/commit/74836ba2ca2bb10534f9dedb6876def66e2f38fe))
* add keyboardHeight state to useAvoidKeyboard and add extra padding to BottomSheetModal scrollviews when keyboard is visible ([20cead9](https://github.com/RBrNx/wedding-project/commit/20cead9c95ad3084178ab287d54c461e65c2eb0c))
* create GuestSignInSheet to allow user to select which account they are logging in as ([ac2902b](https://github.com/RBrNx/wedding-project/commit/ac2902bcc5882e181d7f889c27db7f9508d812df))
* create InvitationFlatlist component to render Invitations and their corresponding guests ([4364db7](https://github.com/RBrNx/wedding-project/commit/4364db71007482d1348f92b01637b73bbb030cd3))
* create useInvitationMutation hook ([86bd63d](https://github.com/RBrNx/wedding-project/commit/86bd63d1bb796e15c286896b9f4d2ee68f5a9055))
* created createGuestUser helper function ([e065b1c](https://github.com/RBrNx/wedding-project/commit/e065b1ced032094b4d7e4f9208b73bb139fd1d82))
* created CreateInvitationSheet to allow invitations to be created along with their associated guests ([5d6c44a](https://github.com/RBrNx/wedding-project/commit/5d6c44a4f5f507d18cf2295b8aaa4e4455595dda))
* overhaul InvitationCard to be more akin to QuestionCard and utilises GuestCard ([4bd1e75](https://github.com/RBrNx/wedding-project/commit/4bd1e752a0aa2c5b27004599378adb43679e2525))
* overhaul InvitationsScreen to match RSVPQuestionsScreen ([c9b0fce](https://github.com/RBrNx/wedding-project/commit/c9b0fcecc3f46f7b5c6b05d82936db9025871948))
* remove invitationId from User model and add invitationCode to InvitationGroup model ([80e8813](https://github.com/RBrNx/wedding-project/commit/80e8813d9d014d73f9fdbd45b0e302c88be7db13))
* replace Guests screen with Invitations screen ([7005eab](https://github.com/RBrNx/wedding-project/commit/7005eab6b2ccb806b6437da77f9a971899a51633))
* replace signInWithInvitationId helper with fetchGuestCredentials ([88a0098](https://github.com/RBrNx/wedding-project/commit/88a0098c9550f22089120805b3b2472349a9722d))

# [0.15.0](https://github.com/RBrNx/wedding-project/compare/v0.14.2...v0.15.0) (2021-08-03)


### Bug Fixes

* add DashboardHeader component to SettingsScreen ([18ba82f](https://github.com/RBrNx/wedding-project/commit/18ba82faef478d6574604009b0d9e5409e0aff94))
* DeleteQuestionButton's text now pays attention to the theme ([c5fe1a1](https://github.com/RBrNx/wedding-project/commit/c5fe1a1290f8ef99aa162153872c0bbb2df44f14))
* error message text is no longer cut off in GuestFlatlist ([7c3c1e2](https://github.com/RBrNx/wedding-project/commit/7c3c1e2b028222b6cbc579f91d95965b045fb32e))
* followUpQuestions are no longer duplicated ([7846d31](https://github.com/RBrNx/wedding-project/commit/7846d31099adf9ade3b93ab9229a839d1e37d722))
* improve colours of QuestionFlatlist components ([66e0192](https://github.com/RBrNx/wedding-project/commit/66e0192e2cb5b831cc3cfb129028949f7e62768d))
* theme can now be changed as expected ([d159b57](https://github.com/RBrNx/wedding-project/commit/d159b57c579d358467851d9398365030898a3bf2))


### Features

* add ability to choose what invitation type a guest will receive ([82c88a6](https://github.com/RBrNx/wedding-project/commit/82c88a69f71f25e78538b9d5f6b78fea24b8818b))
* add ability to delete a guest from ViewGuestScreen ([09f4649](https://github.com/RBrNx/wedding-project/commit/09f4649507fd898061fd4495e1eced5c393b187a))
* add google-services.json to enable push notifications for android ([4a84626](https://github.com/RBrNx/wedding-project/commit/4a846268bbdfce8fa4757ee80f8157c06ca008c2))
* add QuestionGuestType to Question model and typedefs ([898d16e](https://github.com/RBrNx/wedding-project/commit/898d16eb3830dc38191eefafd54c6a7832661f62))
* create deleteGuest mutation ([02d56c5](https://github.com/RBrNx/wedding-project/commit/02d56c571ecc05a327fbf5fed1d800e5cef3faee))
* create NotificationAnimation component ([46f1227](https://github.com/RBrNx/wedding-project/commit/46f12271646aa73f1ac32edf2092419320f33eee))
* create registerPushToken mutation ([af22f83](https://github.com/RBrNx/wedding-project/commit/af22f8367374e70545fc33c17a5c018c0ff4bee7))
* create useGuestMutation hook ([fd260ad](https://github.com/RBrNx/wedding-project/commit/fd260ad101a26305da19b5bca855fe0e80c64f26))
* created GuestTypeLabel component and use it in QuestionCard ([f3d5750](https://github.com/RBrNx/wedding-project/commit/f3d5750e96b958f7904ffeaab0694d6f9afa15ae))
* display guestType on QuestionCard component ([3e5d773](https://github.com/RBrNx/wedding-project/commit/3e5d77311926f2a70f34c80f458a62b1f8005af5))
* push notifications permission is now requested on user login ([c68711f](https://github.com/RBrNx/wedding-project/commit/c68711f5277393e98308e708d2aa135c3d9b1054))
* QuestionGuestType can now be selected in EditQuestionSheet and submitted to the API ([b71bc46](https://github.com/RBrNx/wedding-project/commit/b71bc4610cbd5332f6e94fb2ce5871b3e71ad03a))
* replace GuestTypeLabel and QuestionTypeLabel with EnumLabel component ([475f924](https://github.com/RBrNx/wedding-project/commit/475f924c6677aa7b1076e72fd6bf6bf30e61ed4c))
* RSVPQuestions are now filtered to remove questions that don't match the users invitation type ([c2a4232](https://github.com/RBrNx/wedding-project/commit/c2a4232b4bd2f8112adb8a371ff32db6b4deb7ec))
* spread restOfGuest into update call ([4ab8dc1](https://github.com/RBrNx/wedding-project/commit/4ab8dc105923b254e71df61281d7c6292f5f8635))
* update Settings screen to allow push notifications to be toggled on or off ([6091389](https://github.com/RBrNx/wedding-project/commit/6091389b366191c53d46db867b704e1db3053c6f))

## [0.14.2](https://github.com/RBrNx/wedding-project/compare/v0.14.1...v0.14.2) (2021-08-02)


### Bug Fixes

* add cognito-idp permissions to authenticated lambda ([4f3dfd3](https://github.com/RBrNx/wedding-project/commit/4f3dfd3bbfb469bc2636b21e43ea69cdc0a3c418))
* add permission for cognito-idp:AdminSetUserPassword to authenticated lambda ([69969bb](https://github.com/RBrNx/wedding-project/commit/69969bb144fd46cdbe7948a4b1efbbef8a6e7967))
* ALL_GUESTS_QUERY will now be refetched correctly using variables from the cache ([10b514e](https://github.com/RBrNx/wedding-project/commit/10b514ee065a7c8202d2e9fa879a35561943bfa6))

## [0.14.1](https://github.com/RBrNx/wedding-project/compare/v0.14.0...v0.14.1) (2021-07-31)


### Bug Fixes

* set awsExports to staging environment ([3937dde](https://github.com/RBrNx/wedding-project/commit/3937dde9767e85d59c4e0a21725eb6016f2eb345))

# [0.14.0](https://github.com/RBrNx/wedding-project/compare/v0.13.2...v0.14.0) (2021-07-30)


### Bug Fixes

* add height to ListEmptyContainer in QuestionFlatlist ([3be9708](https://github.com/RBrNx/wedding-project/commit/3be9708179bae7f48be3365618b03eb2ab5ceace))
* added specific height for ListEmptyContainer in GuestFlatlist ([cda5011](https://github.com/RBrNx/wedding-project/commit/cda501152f5f20992b1ca4028b4654d67c279e43))
* added specific height for ListEmptyContainer in GuestFlatlist ([1f968da](https://github.com/RBrNx/wedding-project/commit/1f968daf4bb6fda5abeb13b35a3a025a43e5b211))
* allow followUpQuestions to be updated properly ([1a55f9e](https://github.com/RBrNx/wedding-project/commit/1a55f9e845b9435ec3ebb165488bd23184af870f))
* deleteCognitoUser is now only called if a userId exists ([19f48da](https://github.com/RBrNx/wedding-project/commit/19f48daf2bb7fd415c92feb004ccdab3ca2fddb5))
* eslint issues ([afb7830](https://github.com/RBrNx/wedding-project/commit/afb7830b29af159b47c768f2d8cbf9f926fcc44e))
* improved styling of InvitationsScreen and fix issue with getAllInvitations query ([0f3af95](https://github.com/RBrNx/wedding-project/commit/0f3af95715d72680f0ddc9dacd6ab00b30019408))
* re-add data to GuestFlatlist ([f3cc23f](https://github.com/RBrNx/wedding-project/commit/f3cc23fe1d0371a7d0d8f8fae996d78896fdfce1))
* should only retrieve guests that are attached to a specific event ([0b8d2aa](https://github.com/RBrNx/wedding-project/commit/0b8d2aa88b3f1b6cd9dc54c51f73dec4e64cb533))
* use @babel/eslint-parser as babel-eslint is deprecated ([578833f](https://github.com/RBrNx/wedding-project/commit/578833f18f3e96d72a5e6137eac0d493a0009ee6))
* use headerTextColour for QuestionText ([99ff37c](https://github.com/RBrNx/wedding-project/commit/99ff37ce78274e89136d2d57e7d62b84aef2c604))


### Features

* add .cache and public folders to web-client gitignore ([c61e604](https://github.com/RBrNx/wedding-project/commit/c61e60498eb0c4993b748a4eec94e04cbe3a0922))
* add ability to create rsvp questions ([6b65d45](https://github.com/RBrNx/wedding-project/commit/6b65d459ed69d568a2110a84d5bdca36a4b6cdf8))
* add ability to delete an RSVP question and improve styling of EditQuestionSheet ([f6cd917](https://github.com/RBrNx/wedding-project/commit/f6cd9177d70b43829b50bda27e9db84688addde7))
* add confirmSignUp function to Auth context ([b1bc6ae](https://github.com/RBrNx/wedding-project/commit/b1bc6aeb2ad3fe403355f5541126e840b086c07e))
* add pressedStyle prop to StandardButton ([ed1afd8](https://github.com/RBrNx/wedding-project/commit/ed1afd8d1adcbd9572830077eb4a7d65355ab673))
* added 'outline' style to StandardButton ([19065d6](https://github.com/RBrNx/wedding-project/commit/19065d6eb16ab6ff942933177210b704c994f5e6))
* added ability to remove elevation from StandardActionButton ([af4f691](https://github.com/RBrNx/wedding-project/commit/af4f6912eb5fbbe0decfc9e1ad2e43b211406168))
* added ability to update an RSVP question ([4e5743f](https://github.com/RBrNx/wedding-project/commit/4e5743f27897d95de100ff700bf7696fc73f6a0a))
* added required answer to QuestionCard ([060d070](https://github.com/RBrNx/wedding-project/commit/060d07053e72ccf538da0a3615dc5877cf986c29))
* added search ability to getAllGuests resolver ([7769bd8](https://github.com/RBrNx/wedding-project/commit/7769bd8a1d224275de69a3fe82d5c7bff058a308))
* added SignUp button to SignIn screen ([d4b078c](https://github.com/RBrNx/wedding-project/commit/d4b078ccf5ae1e8218a22977cfadfe96b9cf96e5))
* allow ViewGuestScreen to be navigated to by pressing on a GuestCard ([7c95bbe](https://github.com/RBrNx/wedding-project/commit/7c95bbe888d2c3beb1a9b72da023552661702806))
* an Admin account must be created alongside an event, and events can now be created by unauthenticated users ([9ec2c84](https://github.com/RBrNx/wedding-project/commit/9ec2c844573e91d10bd87d394919e067819ad608))
* BottomSheetModal will now avoid the keyboard ([d7d8e10](https://github.com/RBrNx/wedding-project/commit/d7d8e1032518b086e0d4caf4178846105b3590c5))
* Cognito now sends a 6 digit code instead of a confirmation link ([98af820](https://github.com/RBrNx/wedding-project/commit/98af820851c62a198837ba142aa94b915a5b912e))
* create AddGuestSheet and createGuest mutation ([452a15d](https://github.com/RBrNx/wedding-project/commit/452a15df04e64163fab5e469c2475a05e89a1925))
* create ConfirmSignUpScreen ([4457dee](https://github.com/RBrNx/wedding-project/commit/4457deece1336a4140d5d3b2b56a70b01bf15a74))
* create deleteQuestion mutation and typedefs ([7884730](https://github.com/RBrNx/wedding-project/commit/78847301227f8921912a86849436963d6e04de2c))
* create email handler for forwarding emails sent to help@thewatsonwedding.com ([7c909fd](https://github.com/RBrNx/wedding-project/commit/7c909fd8abf84bd6a8e1cfd1407570711664c76a))
* create first iteration of QuestionCard ([bf5c02c](https://github.com/RBrNx/wedding-project/commit/bf5c02c543459d784a14c82f9b36c93fb57c565e))
* create first iteration of QuestionFlatlist and RSVPQuestionsScreen ([f557fa1](https://github.com/RBrNx/wedding-project/commit/f557fa1a85a253383222c580478408837bbf5a41))
* create inputTextColour theme ([2fcc2aa](https://github.com/RBrNx/wedding-project/commit/2fcc2aaa5ea6325d5039dc0222b6850acec9388a))
* create QRCode component ([4180a16](https://github.com/RBrNx/wedding-project/commit/4180a16217807f49062879ce806ba76f81ccc454))
* create QuestionTypeLabel component ([a5d550c](https://github.com/RBrNx/wedding-project/commit/a5d550cb2551ec025740425e3c9d76b35216557f))
* create serverless config for Email lambda forwarding service ([bab5ea7](https://github.com/RBrNx/wedding-project/commit/bab5ea735de4cfcf25dae445d2a9aad2bc3fdaae))
* create ses-forwarding.yml config for resources ([2e2e890](https://github.com/RBrNx/wedding-project/commit/2e2e890dc69fbf824ae7746ea3fc52cfded5210d))
* create SignUpScreen to allow general public to create their own event ([9e8a9bb](https://github.com/RBrNx/wedding-project/commit/9e8a9bbae77c521d1860bae0742aee88d5d889b9))
* create StandardCodeInput ([8d80579](https://github.com/RBrNx/wedding-project/commit/8d8057952ab8bb366e510f29d28fea88cccffac0))
* create StandardDatePicker component ([2384502](https://github.com/RBrNx/wedding-project/commit/2384502c50bd262c20b5a2018407f3c05ffcb016))
* create StandardPillPressable component ([34a0114](https://github.com/RBrNx/wedding-project/commit/34a01142fb7d0fe82c40ac36a4d754e52501a4b3))
* create StandardSearchSortBar component ([a4a69f8](https://github.com/RBrNx/wedding-project/commit/a4a69f80c224d5ec602f2ca8903b0e6fe73c6fd6))
* create StandardSelectInput component ([fb19f89](https://github.com/RBrNx/wedding-project/commit/fb19f891e769c8259af86b9a6c35a73e27ac5ec2))
* create ui skeleton for EditQuestionSheet ([f7f3b18](https://github.com/RBrNx/wedding-project/commit/f7f3b181655c8bcca613c5571c896e06d6c9d70a))
* create useBottomSheetActionButton hook ([67b858a](https://github.com/RBrNx/wedding-project/commit/67b858aa166a99cb1106faf4451c7991b4b6f0d0))
* create ViewGuestScreen, add it to the AdminNavigator and request invitationId during getAllGuests query ([97efca0](https://github.com/RBrNx/wedding-project/commit/97efca0387f8cac2aaf63855cd224814dfc19a5f))
* improve styling and functionality of GuestsScreen ([3d8c128](https://github.com/RBrNx/wedding-project/commit/3d8c12811b6bd86068fd12f7d5e79cefb9e73495))
* overhauled GuestsScreen to match styling in other places of the app and replaced HeaderFlatlist with a BottomSheet ([891aec2](https://github.com/RBrNx/wedding-project/commit/891aec27e60cd567a4810ff15fcad93a7af615b4))
* replace InvitationsScreen with RSVPQuestionsScreen ([59507e7](https://github.com/RBrNx/wedding-project/commit/59507e7de9483badf154007989b99bda85409d9a))
* return rsvpForm field with getAllGuests query ([8df2eb4](https://github.com/RBrNx/wedding-project/commit/8df2eb49bce464dea55baa4e02ff327e0aaffcd0))
* rework updateQuestion so that it can upsert followUpQuestions and deleteQuestion will now remove from parents followUpQuestions ([bcbe9b7](https://github.com/RBrNx/wedding-project/commit/bcbe9b7d57cbe6317bc74045e69985ed114ca7c1))
* simplified HeaderFlatlist component ([2e3686b](https://github.com/RBrNx/wedding-project/commit/2e3686bb0ec04b54fecc496f80f9f48825705c64))
* started adding support for creating a question via EditQuestionSheet and now follow up required answers can be updated ([964e431](https://github.com/RBrNx/wedding-project/commit/964e431a50a072ba2788472e1d6298ac92a7f880))
* StatusLine style can now be overridden ([fc4eb00](https://github.com/RBrNx/wedding-project/commit/fc4eb00858efa353c6a0bd1a903248dbf0f90a71))
* tapping a question will now open the EditQuestionSheet ([bf2c8ad](https://github.com/RBrNx/wedding-project/commit/bf2c8ad7d44a94a7d7a3b8e2061be9b974efa165))
* updated getAllGuests resolver to use an aggregate pipeline containing a lookup to retrieve the invitationId of a user from the tempLoginDetails collection ([3932514](https://github.com/RBrNx/wedding-project/commit/3932514ace082d7c8f1a24c4669cf5886732154e))
* updated LandingScreen to be a little more generic ([095fa76](https://github.com/RBrNx/wedding-project/commit/095fa760b91b3b47bf853294369b0ff71962036a))

## [0.13.2](https://github.com/RBrNx/wedding-project/compare/v0.13.1...v0.13.2) (2021-07-13)


### Bug Fixes

* improve TabBar style on iOS devices with a home button ([da5a37e](https://github.com/RBrNx/wedding-project/commit/da5a37ef7ffd455c884a9512bd8b441409ffe17d))

## [0.13.1](https://github.com/RBrNx/wedding-project/compare/v0.13.0...v0.13.1) (2021-07-09)


### Bug Fixes

* add WRITE_EXTERNAL_STORAGE permission for android ([116be2a](https://github.com/RBrNx/wedding-project/commit/116be2a1838f7e5e42945f0543c0188daef5ec49))

# [0.13.0](https://github.com/RBrNx/wedding-project/compare/v0.12.0...v0.13.0) (2021-07-07)


### Features

* add correct permissions for ios and android to app.json ([af31d62](https://github.com/RBrNx/wedding-project/commit/af31d62964feb5bc9e5b992734ee850d1e9a33b1))

# [0.12.0](https://github.com/RBrNx/wedding-project/compare/v0.11.0...v0.12.0) (2021-07-06)


### Bug Fixes

* tall images can now be swiped away correctly ([5b89796](https://github.com/RBrNx/wedding-project/commit/5b8979614674731b13128fd42e78395f1bd03e73))


### Features

* updated ReText to handle derived values internally ([68c5a10](https://github.com/RBrNx/wedding-project/commit/68c5a102abb85c145a737ccad1008a66c3f5e66d))

# [0.11.0](https://github.com/RBrNx/wedding-project/compare/v0.10.1...v0.11.0) (2021-07-06)


### Bug Fixes

* added better success handling around uploading a memory so that images and alerts are not duplicated ([077b5e7](https://github.com/RBrNx/wedding-project/commit/077b5e767c7abc9b7bc8a86235ae4ee609d205f9))


### Features

* generate temporary albumId for uploaded memories ([99bc294](https://github.com/RBrNx/wedding-project/commit/99bc2942b0e3ee513a121ad029afa70866f32cac))
* return albumId alongside album ([6f12dff](https://github.com/RBrNx/wedding-project/commit/6f12dffe4c3734ef96e282650bb1d0a41808e30d))

## [0.10.1](https://github.com/RBrNx/wedding-project/compare/v0.10.0...v0.10.1) (2021-07-05)


### Bug Fixes

* added custom BottomSheet background ([c45097b](https://github.com/RBrNx/wedding-project/commit/c45097b99e26f74552762e57b1700e56d06c756e))
* decrease size of LoadingIndicator in ScannerScreen ([eb4ffc2](https://github.com/RBrNx/wedding-project/commit/eb4ffc2805ebf819a5f436be8555b5049f1d7a43))
* use better semantic-release-expo versions that actually create a new android versionCode ([f3c59dc](https://github.com/RBrNx/wedding-project/commit/f3c59dcc100393a929179d332d9d6fcff63ab28f))

# [0.10.0](https://github.com/RBrNx/wedding-project/compare/v0.9.0...v0.10.0) (2021-07-05)


### Bug Fixes

* add some extra bottom padding around certain buttons on iOS ([7ad4ca0](https://github.com/RBrNx/wedding-project/commit/7ad4ca0725450c5a2d7ec569eb74f33f8ae81fe0))
* clear Apollo store when user logs out ([f1838a9](https://github.com/RBrNx/wedding-project/commit/f1838a9a95a514eec35e254c8d4bdb59840c352c))
* close keyboard when moving to RSVPOverview ([dea01d5](https://github.com/RBrNx/wedding-project/commit/dea01d5254bcacde15df1b940bc47fa63915ee50))
* Folder ListContainer is now 100% width ([ee91f1b](https://github.com/RBrNx/wedding-project/commit/ee91f1b76579ab59b937c2eed19c92b94ccdacda))
* GridItems and Spacers are now exactly 1/3 of screen width ([c58dbe4](https://github.com/RBrNx/wedding-project/commit/c58dbe4da567981b2eccf8c19431bae6e37bb92f))
* jpeg file extension is now supported in addition to jpg ([2777f1c](https://github.com/RBrNx/wedding-project/commit/2777f1cef5879d778f04f488cd8ca9d5e4cbb0b6))
* only attempt BarCode sign in if an invitationId is found ([ba267e0](https://github.com/RBrNx/wedding-project/commit/ba267e03b4457a206965269bb57fe0258dd54d57))
* only attempt to retrieve local assets if permission has been granted ([8cc027a](https://github.com/RBrNx/wedding-project/commit/8cc027a197c01bd61093d68f0bf8d32d4e4d54ca))
* only mount MemoryUploader when the tab is focused ([f4caa9a](https://github.com/RBrNx/wedding-project/commit/f4caa9abcb7a63bf7590e69446ba79b0983c5cee))
* position StandardActionButton slightly higher on iOS to account for home bar ([040515e](https://github.com/RBrNx/wedding-project/commit/040515eb0c912b6561eed9b811efabf89dc5aa3c))


### Features

* add header to MemoryUploader sheet ([eb1d505](https://github.com/RBrNx/wedding-project/commit/eb1d50592a9ae04fbc64cb91a9a4119246e8952f))
* created MemoriesGridHeader and use it as ListHeaderComponent in MemoriesGrid ([15becad](https://github.com/RBrNx/wedding-project/commit/15becad07fd22a5a2d9cd1d5021cac5ffef1f93a))
* expand and shrink RSVP BottomSheet when the keyboard appears/hides ([141be6b](https://github.com/RBrNx/wedding-project/commit/141be6b4f004af645f485db65ffc0270432748e9))
* ImageGallery now closes when back button is pressed ([e504a7d](https://github.com/RBrNx/wedding-project/commit/e504a7d8b1a989c694efedf3d9e29bc99a400718))
* improve handling of permissions surrounding MemoryUploader ([767415e](https://github.com/RBrNx/wedding-project/commit/767415ea648f2e31bf514be6aae6bc0b6e9f305e))
* pass size prop down to LottieView ([cdb6ec6](https://github.com/RBrNx/wedding-project/commit/cdb6ec67685a20a076e8b154141ff37cddde9689))
* store createdAt in metadata so that it is no longer depdendant on which lambda finishes first ([2d79afc](https://github.com/RBrNx/wedding-project/commit/2d79afc402db9c8167d47b368dbc2bdd11895c23))

# [0.9.0](https://github.com/RBrNx/wedding-project/compare/v0.8.2...v0.9.0) (2021-07-04)


### Bug Fixes

* allow expo-publish-dev to be run when the workflow changes ([759bec8](https://github.com/RBrNx/wedding-project/commit/759bec8cfc791a60d3927670ee32d4da4fdd0f54))
* attempt to increase heap size when publishing expo builds ([bc395b9](https://github.com/RBrNx/wedding-project/commit/bc395b97687314a9918d49629b8bfbb7132fd268))
* attempt to run serverless deploy without serverless/github-action ([ad028b0](https://github.com/RBrNx/wedding-project/commit/ad028b05057bace321862077d97cd551589d9190))
* CDN_DOMAIN_NAME is now passed directly inside serverless.yml instead of being an environment variable ([97e7c2b](https://github.com/RBrNx/wedding-project/commit/97e7c2b48051f1a3a2624187d6282ebb43d22237))
* domains to be used in serverless are now built from separate parts ([bfda735](https://github.com/RBrNx/wedding-project/commit/bfda7351547066071ffbd0fa4f56b365b16b0b9b))


### Features

* deploy-api-staging workflow now mirrors deploy-api-dev ([035c0d3](https://github.com/RBrNx/wedding-project/commit/035c0d3b27074e12a7df3554d3899fb163142d8d))
* expo-publish-staging now mirrors expo-publish-dev ([643e16a](https://github.com/RBrNx/wedding-project/commit/643e16ab2d3c522ccda9056f5ea158925601d29f))

## [0.8.2](https://github.com/RBrNx/wedding-project/compare/v0.8.1...v0.8.2) (2021-07-01)


### Bug Fixes

* increase heap size for expo-publish-staging ([7d2eaa8](https://github.com/RBrNx/wedding-project/commit/7d2eaa81327ddf457700a0e27598e8b35aabee2b))

## [0.8.1](https://github.com/RBrNx/wedding-project/compare/v0.8.0...v0.8.1) (2021-07-01)


### Bug Fixes

* allow deploy-api-staging and expo-publish-staging workflows to run when they have been modified ([b2ad7d8](https://github.com/RBrNx/wedding-project/commit/b2ad7d8a81d7e9a3709bafe4e1645b04df3b3028))
* switch awsExports to staging values ([8df46aa](https://github.com/RBrNx/wedding-project/commit/8df46aa6aefbcf8d2fda667dee85832c8538b3b1))

# [0.8.0](https://github.com/RBrNx/wedding-project/compare/v0.7.3...v0.8.0) (2021-06-30)


### Bug Fixes

* add local file support to CachedImage ([e4930a6](https://github.com/RBrNx/wedding-project/commit/e4930a6c60e12b1892e59f5913337237aa8134c8))
* add missing CLOUDFRONT_SIGNER_PRIVATE_KEY env variable ([a75acdf](https://github.com/RBrNx/wedding-project/commit/a75acdfd8325ddb30f9da4ea5d180703db040e9a))
* add missing env variables to api deployment workflows ([70dfaf5](https://github.com/RBrNx/wedding-project/commit/70dfaf549fd3bf721531e6004c2ef161499b3ad3))
* add permission for putObject in processUpload handler ([9c3bba0](https://github.com/RBrNx/wedding-project/commit/9c3bba0157e624984c320e551c1a3a6a495fdc50))
* albums with more than 4 images now rendered correctly and StatusBar is now taken into account ([8f2f58e](https://github.com/RBrNx/wedding-project/commit/8f2f58e3d2f6b0b50926705989b5f3355d344fbd))
* allow certain unused vars ([ad54d43](https://github.com/RBrNx/wedding-project/commit/ad54d43069f933ee0656f2d0aea3e80d86f8c4fb))
* awsSigV4Fetch now correctly handles duplicate slashes ([b0a0163](https://github.com/RBrNx/wedding-project/commit/b0a0163330f55319f12107d66f3531abc08bb426))
* default ReText colour to white ([f81c98c](https://github.com/RBrNx/wedding-project/commit/f81c98c5ec398dc4a3d9f34c49a9a600826f11ca))
* eslint errors ([405ba57](https://github.com/RBrNx/wedding-project/commit/405ba57002dd52e299611f42cd29b28850d88599))
* image now displays behind the statusbar, similar to Google Photos ([3f450f8](https://github.com/RBrNx/wedding-project/commit/3f450f85d62dc7d8370964dc2174f638aa50e19f))
* improve CachedImage so it no longer gets stuck loading ([c0a309b](https://github.com/RBrNx/wedding-project/commit/c0a309bddfac17687d2ce6b95a339b1cf7146daa))
* improve image gallery styling in ios ([099ffac](https://github.com/RBrNx/wedding-project/commit/099fface67b82b34b888e7d73fe241fceca680a4))
* include sortIndex, caption, uploadedBy and createdAt properties for upload ([60452db](https://github.com/RBrNx/wedding-project/commit/60452db106b98db9458e19b16eec6e63f7caf390))
* only store caption if it has a value ([09c709b](https://github.com/RBrNx/wedding-project/commit/09c709b688f9d8775a1c453cdef9912ac7d97421))
* pinch to zoom gesture no longer jumps when fingers are released ([cc90eec](https://github.com/RBrNx/wedding-project/commit/cc90eec495460602e6437235e2d69133a220b35d))
* remove cacheKey from ImageModal ([b218e16](https://github.com/RBrNx/wedding-project/commit/b218e164efd5017f17b464cd9cf3967951615e64))
* remove cd command from Install Modules step ([2728b4b](https://github.com/RBrNx/wedding-project/commit/2728b4bae3add7cce5f45d0ac7876505283c43c7))
* reset index values ([43cbef9](https://github.com/RBrNx/wedding-project/commit/43cbef9078bd6ea0657118581ed30f2feaff81b1))
* revert sharp changes ([a267866](https://github.com/RBrNx/wedding-project/commit/a2678665ef452cbc67bfcbd5f0f5b916f841b90c))
* rewrite cleanImageCache to chunk requests to avoid many promises firing at once ([b164c60](https://github.com/RBrNx/wedding-project/commit/b164c609a440318e4bac68671ceae067bbd8e0c9))
* sharp will now keep the orientation of the image that has been uploaded ([aab91c6](https://github.com/RBrNx/wedding-project/commit/aab91c6aabedb62543890c7e4c48a1ac807728ee))
* temporarily disable frozen lockfile ([749b67f](https://github.com/RBrNx/wedding-project/commit/749b67f006388326b9f4b697458056b942cc8aa0))
* update awsExports to point to dev ([c036f33](https://github.com/RBrNx/wedding-project/commit/c036f33dd9d343fcf956dafdc10842b904356c30))
* Vector set and subtract helpers now allow 0 as a value ([a50ad73](https://github.com/RBrNx/wedding-project/commit/a50ad73a2d9d4240c98eb9e37f9fbbe850d41f1d))


### Features

* add a captionMode to ImageGallery for entering caption text ([0343115](https://github.com/RBrNx/wedding-project/commit/0343115cf0b79dc9310c707847fc527e38ebd876))
* add ability to caption images before upload ([9ecf0d9](https://github.com/RBrNx/wedding-project/commit/9ecf0d937f1cc5ea8aa05121e6f2d667d12f1eba))
* add ability to load more assets when scrolling ([d2e6cc1](https://github.com/RBrNx/wedding-project/commit/d2e6cc12fcb117b6e39dc550ed007e689fe9345d))
* add album support to memory uploading ([8150b58](https://github.com/RBrNx/wedding-project/commit/8150b58b0a58e6c61ee699d3808b7ba2adac2347))
* add alert message when images are uploaded successfully ([9e6b040](https://github.com/RBrNx/wedding-project/commit/9e6b040bfdaeb9a19423f46c01d4eb383ecd8067))
* add cloudfront signer keys to .gitignore ([f757725](https://github.com/RBrNx/wedding-project/commit/f7577259296b3c62ee6766322082695dbcdb5d0c))
* add containerStyle prop to StandardActionButton ([be1c8f0](https://github.com/RBrNx/wedding-project/commit/be1c8f01f1491fe4723b036fea37b37a55beea73))
* add displaying captions in ImageGalleryFooter and add linear gradient to ImageGalleryHeader ([df05a13](https://github.com/RBrNx/wedding-project/commit/df05a13b18b970b910475c197d74f6263e39f8a8))
* add ImageGalleryHeader component to ImageGallery ([2af0423](https://github.com/RBrNx/wedding-project/commit/2af0423fc4e3f3c7364b407175e47f2ef855a47f))
* add includeKeyboardHeight flag to useAvoidKeyboard hook and use it to allow the CaptionInputContainer to work on both iOS and Android ([0e8ea2b](https://github.com/RBrNx/wedding-project/commit/0e8ea2bd4a39e8fab583576786d6f6c0937110bf))
* add rounded mode to StandardTextInput ([6f22b81](https://github.com/RBrNx/wedding-project/commit/6f22b81db3f991bb753cad0e64bb5a8f74169988))
* add sortIndex and caption to getMemoryAlbums query ([22e3430](https://github.com/RBrNx/wedding-project/commit/22e343091b2ee54e8cb1a9baa54581416935f3c4))
* add support for adding captions + sorting to memory uploads ([90b386c](https://github.com/RBrNx/wedding-project/commit/90b386c550cbdb23e66c79c9acc500966f735b8b))
* add support for displaying Albums in the GalleryGrid ([5053945](https://github.com/RBrNx/wedding-project/commit/50539458666afbfdad5b0ff013d9b31b9985ed9b))
* add support for HEIC and HEIF images for iOS ([a462ee4](https://github.com/RBrNx/wedding-project/commit/a462ee4938de22127c92b386668b2814e47c4813))
* added ability to select multiple items in MemoryUploader ([c4d89c5](https://github.com/RBrNx/wedding-project/commit/c4d89c5624ba5f7f6595cf749518fcb2df806821))
* added support for a loading indicator in CachedImage and cacheKey is now a hash generated from the URI ([41150e6](https://github.com/RBrNx/wedding-project/commit/41150e6897492b23f9d52a6b54d0ae97b131c39f))
* allow image margin to be modified ([67e4920](https://github.com/RBrNx/wedding-project/commit/67e4920e83ecd1f11aa5bae28d3d9a959e4f52a7))
* allow images to be swiped away in either direction, up or down ([ef9f88c](https://github.com/RBrNx/wedding-project/commit/ef9f88ca139ca062f2e68e10967685c949577b67))
* attempt to install sharp library correctly for lambda environment ([0f80113](https://github.com/RBrNx/wedding-project/commit/0f80113ab2312465d96c041157b70895adb5351e))
* combine loadAssets and loadMoreAssets ([8a0aa70](https://github.com/RBrNx/wedding-project/commit/8a0aa705589d3140ab7c9d49be63d5799bdce712))
* create CachedImage component and clear down image cache when app loads ([bd00a49](https://github.com/RBrNx/wedding-project/commit/bd00a49ee0e8465fc3ef4ff78144968770706bc5))
* create CloudFront KeyGroup so that images can only be accessed via signedUrls ([cc74f7a](https://github.com/RBrNx/wedding-project/commit/cc74f7ab0d2b6c216001d31edabf327a5176c9b9))
* create getMemoryAlbums resolver ([a0b4bc4](https://github.com/RBrNx/wedding-project/commit/a0b4bc4068394dfdd159806cb445dcbed6c2f1f1))
* create initial attempt at MemoriesScreen, with a working gallery and long press preview ([b59a587](https://github.com/RBrNx/wedding-project/commit/b59a58712aac9e52431e200cb753ddb942fdc181))
* create initial Memories resolvers + typedefs - currently using PicsumAPI to return images ([5d0ff07](https://github.com/RBrNx/wedding-project/commit/5d0ff0707eb41a306e039c24895dd60c8db34480))
* create Memory model ([8f20a0a](https://github.com/RBrNx/wedding-project/commit/8f20a0a442a1f1bbbba24df2bc686d9ab00635a0))
* create PhotosBucket and CloudFront CDN to serve images/memories. Also created initiateUpload and processUpload lambdas for S3 direct upload ([4a6663d](https://github.com/RBrNx/wedding-project/commit/4a6663d197763f08dcf481eb30f277233fe9298d))
* create ReText component to allow easier debugging of reanimated values ([3e011de](https://github.com/RBrNx/wedding-project/commit/3e011de7ed3755917ae73ec7827dd24e02b6a1df))
* create RNBlob class as a wrapper around Blob because axios has issues with the latter ([1cf7f8c](https://github.com/RBrNx/wedding-project/commit/1cf7f8c1436c79aab5097ea053952f86250095e0))
* create useRefreshControl hook to simplify pull to refresh ([33b989e](https://github.com/RBrNx/wedding-project/commit/33b989e3c6c01a8f5c965191a89752412700704b))
* created initial ViewMemoryScreen ([36688ec](https://github.com/RBrNx/wedding-project/commit/36688ec078233407de181e6d4764c2f763b73340))
* first attempt at creating a fully responsive pan/zoom/swipe image component ([a741594](https://github.com/RBrNx/wedding-project/commit/a741594e440345462be9fc1af6bf7b4bc4daf1d9))
* first attempt at generating thumbnails after upload ([72bb1fd](https://github.com/RBrNx/wedding-project/commit/72bb1fde70ce8f5b62ab86925a40abc20499bbcc))
* first working attempt at pinch to zoom ([8089bb3](https://github.com/RBrNx/wedding-project/commit/8089bb3df0b50f5b190a8d45f6f96b1d977c5bb3))
* first working version of image uploading ([b37bd1b](https://github.com/RBrNx/wedding-project/commit/b37bd1b14ec09e96e88dda7660fd2f1d16ad58ee))
* GalleryImage now supports displaying an image via uri ([a2cc6e4](https://github.com/RBrNx/wedding-project/commit/a2cc6e48d2819faaa782dd880eb1669a39743032))
* hide action button when gallery is visible and add spacers to MemoriesGrid ([7e3ef0a](https://github.com/RBrNx/wedding-project/commit/7e3ef0ab77d916e53f6017550fecff30e6e6a63e))
* improve fade in/out transition when changing folders ([48d8ef3](https://github.com/RBrNx/wedding-project/commit/48d8ef3924a587cb9b1ae512a2ad3a6f401ff5bf))
* improve uploading UX of ImageGallery ([7d82143](https://github.com/RBrNx/wedding-project/commit/7d8214333c6fc0dfec9d91e4a623a0a4c3f273f3))
* install sharp version that will run on AWS lambda and fix issues with missing packages/packager setup ([10cfddf](https://github.com/RBrNx/wedding-project/commit/10cfddf94fe1d47c3a16c6466d46c34af0d254e8))
* install tree during API deployment and attempt to install packages directly from wedding-api folder ([6f8b1ce](https://github.com/RBrNx/wedding-project/commit/6f8b1ce85ed4761208e96578b8203ec8edd94da8))
* load all tab screens at once to help the Memory images load quickly ([7ed2666](https://github.com/RBrNx/wedding-project/commit/7ed2666c59d73289795b9cc6b422abac8a169041))
* modify Memories components to work with new Memory API / entity ([ea672e0](https://github.com/RBrNx/wedding-project/commit/ea672e0d8d46ef6072d4d36bf2e389cb741df97d))
* performance improvements for MemoriesGrid and GridItem ([9e0c11c](https://github.com/RBrNx/wedding-project/commit/9e0c11cfa2ddcb8334eba19ee3de716e3a319c6f))
* performance optimizations for MemoryUploader ([05b0ef3](https://github.com/RBrNx/wedding-project/commit/05b0ef37ffb1ae0e3b58d78c299d7e8bf1f17f58))
* processUpload now reformats the original image into a JPEG ([9f487af](https://github.com/RBrNx/wedding-project/commit/9f487af745b5659ad4aaa49a0c0f3db02b9d389e))
* refetch memories when tab is focused ([81d9f66](https://github.com/RBrNx/wedding-project/commit/81d9f66c4818b2434e95282d22aa71f2065eb2e6))
* render real uploader name and date for memories ([fab943d](https://github.com/RBrNx/wedding-project/commit/fab943d20c317aa8223b922e43846e9d9c12447c))
* replace axios with wretch and remove RNBlob as it is causing a crash on iOS ([ea451dc](https://github.com/RBrNx/wedding-project/commit/ea451dc5b199dedc6dc805353391e5768e019871))
* return signedThumbnails with memory albums ([4b665f2](https://github.com/RBrNx/wedding-project/commit/4b665f2d466b2fa8ad8a6d55d9ab99f4799ee08e))
* reversed direction of ImageGallery component so it now works left to right ([b985eb9](https://github.com/RBrNx/wedding-project/commit/b985eb9e880e4a95b6d556959fbe197a80e3cecb))
* scale uploader thumbnail down when image is selected ([4eb7fa4](https://github.com/RBrNx/wedding-project/commit/4eb7fa4ef0e7fc8d3db7911e18e3f253b50bc6f8))
* show loading spinner while images are uploading ([c024362](https://github.com/RBrNx/wedding-project/commit/c024362d6650e37b4c8002a308626c2788751f3d))
* sort media by newest ([8970b3a](https://github.com/RBrNx/wedding-project/commit/8970b3a26f6c02c35417ec1581150eb342480045))
* started implementing memory uploader ([96d502f](https://github.com/RBrNx/wedding-project/commit/96d502fe77f71c562af99ff204d5635b75e13043))
* submit uploadedBy property when uploading memories ([f992564](https://github.com/RBrNx/wedding-project/commit/f9925648e4f799ade7a371d52145e878b8ad2733))
* tapping on the GalleryImage now hides ImageGalleryHeader ([0b1bc1f](https://github.com/RBrNx/wedding-project/commit/0b1bc1fad7112a1d21d314ff64c742ec584394e4))
* update rendering of captions to include support for complimentary colours and add initial support for uploader name ([1e987c9](https://github.com/RBrNx/wedding-project/commit/1e987c9fe75a46d37923303abdb9fef7d56a1638))
* use @gorham/portal to display image gallery above tab navigator ([413e697](https://github.com/RBrNx/wedding-project/commit/413e697c8f3b2f4065a8b9125781b8bcfed5f040))
* use node-vibrant to calculate the dominant colour during image processing ([f79d379](https://github.com/RBrNx/wedding-project/commit/f79d379bc68f86d74a226f2ca1d5ad01b7f6b62f))

## [0.7.3](https://github.com/RBrNx/wedding-project/compare/v0.7.2...v0.7.3) (2021-05-09)


### Bug Fixes

* skip initial getCurrentUser call as cognito credentials seem to be getting cached somehow which is causing "authenticated" to still be false when the Auth component re-renders ([1400b96](https://github.com/RBrNx/wedding-project/commit/1400b96dfbe02bc5296ad31e645c594fd66daf7a))

## [0.7.2](https://github.com/RBrNx/wedding-project/compare/v0.7.1...v0.7.2) (2021-05-09)


### Bug Fixes

* set bootstrapComplete if user isn't logged in at all ([72a56b9](https://github.com/RBrNx/wedding-project/commit/72a56b954db91d7ee9357b6e1118881e171f2e70))

## [0.7.1](https://github.com/RBrNx/wedding-project/compare/v0.7.0...v0.7.1) (2021-05-09)


### Bug Fixes

* add artist name to song request answer ([4fe4bef](https://github.com/RBrNx/wedding-project/commit/4fe4befcbb620889f1a6b57cd592520779ef146c))
* add extra checks around handling of spotify tracks and fixed issues with removeTrackFromPlaylist sending parameters as a query string ([938e16c](https://github.com/RBrNx/wedding-project/commit/938e16c821d698e95160a4ecbe6a3df84ea13882))
* add missing environment variables ([934526f](https://github.com/RBrNx/wedding-project/commit/934526ff35149e8dba1b0276f4ef65982ce20fed))
* default char count value to 0 if value is null ([b71a33a](https://github.com/RBrNx/wedding-project/commit/b71a33abdec1c8270dfabb21fe6f44ef11857d12))
* improve handling of existing RSVP form so SpotifySearchInput is pre-populated ([b237533](https://github.com/RBrNx/wedding-project/commit/b23753311c2190f557af9c0ba07de6f7bebc77b6))

# [0.7.0](https://github.com/RBrNx/wedding-project/compare/v0.6.2...v0.7.0) (2021-05-07)


### Bug Fixes

* add underline to RegistryCard ([b6c382f](https://github.com/RBrNx/wedding-project/commit/b6c382fc647216ca91f928baaae833ccb45efa99))
* allow songs to be selected while the keyboard is visible ([e30c4d2](https://github.com/RBrNx/wedding-project/commit/e30c4d20bf4b0463ed7a84aa96eb171399c71238))
* calculateQuestions now correctly handles multiple followUpQuestions ([703245a](https://github.com/RBrNx/wedding-project/commit/703245a4c67d9b325940ea38b3670d7f096cc616))
* improved handling of updating spotifyConfig ([ab1c84a](https://github.com/RBrNx/wedding-project/commit/ab1c84a064363daf5d55432f3ec6af12d58c166a))
* install mobile-client modules as well ([321a075](https://github.com/RBrNx/wedding-project/commit/321a0755ae8b2b96e22a789cde835590577fa191))
* map through questions instead of rsvpForm values so that question order is kept intact ([ba77fc3](https://github.com/RBrNx/wedding-project/commit/ba77fc35e2f51be86343c99bd63051f64e4e9500))
* pass isAttending flag to RSVPSuccess screen so that it can render the correct string ([9dfc389](https://github.com/RBrNx/wedding-project/commit/9dfc389ba20a8c0422fb1092264ed817536b2dab))
* remove unused variable ([ab9d3cb](https://github.com/RBrNx/wedding-project/commit/ab9d3cb8ebf3bebadbc2e5980381ee65ff5742af))
* remove unused variables ([e288a72](https://github.com/RBrNx/wedding-project/commit/e288a728fb4122bca83c119de96bf99dee79295c))
* return _id and choices for users rsvpForm ([56905ae](https://github.com/RBrNx/wedding-project/commit/56905ae0e2950890a7f7c3f1ca2bf4038c513c4e))
* return label, placeholder and isFollowUp properties from followUpQuestions ([1588cf9](https://github.com/RBrNx/wedding-project/commit/1588cf9f6e529c2800c3c80baf7493dea13eefb6))
* run lint:reports regardless of exit codes ([ea12c2f](https://github.com/RBrNx/wedding-project/commit/ea12c2f279f8a03eed8ef363eafc0b746bf514df))
* switched colours of Grey 2 and Grey 3 so they are now in the correct order ([d499272](https://github.com/RBrNx/wedding-project/commit/d49927218dcb3a04989284aa26c09aa519577a33))
* try using github-pr-check reporter ([a159ec6](https://github.com/RBrNx/wedding-project/commit/a159ec68ae00698bf2d80d3ded715c143bcd347e))
* ViewRSVPSheet no longer crashes if rsvpForm does not exist ([a90b42b](https://github.com/RBrNx/wedding-project/commit/a90b42bbec59d4c9c99718a15ce1991a9243f36c))


### Features

* add character count to RSVP TEXT questions ([da6079e](https://github.com/RBrNx/wedding-project/commit/da6079e2b8d64a1354ddab8388f3af3d1b35576e))
* add flex mode to Spacer component ([204ad29](https://github.com/RBrNx/wedding-project/commit/204ad291146875283a500a6a987a1fec2beae31f))
* add liner-gradient backgrounds to MemoriesCard and RSVPCard ([9794eef](https://github.com/RBrNx/wedding-project/commit/9794eef1fbbc84a3a20913a2c32c0b8a670471d8))
* add outerChildren and animatedIndex support to BottomSheetModal ([45edec4](https://github.com/RBrNx/wedding-project/commit/45edec4ff465ed6df0bb0584ffccecc3afd9a36e))
* add QuestionLoader skeleton to RSVPQuestion ([92e0baa](https://github.com/RBrNx/wedding-project/commit/92e0baa72c9221a9e97c1c5d3101dc91e3836ffb))
* add SONG_REQUEST to QuestionType ([718a31a](https://github.com/RBrNx/wedding-project/commit/718a31ab48d7253541421b6936d89013162e783b))
* add statusBarHeight to layout ([037f58d](https://github.com/RBrNx/wedding-project/commit/037f58d29e4873bdcd1460522737b53aeead36f1))
* add style prop support to StandardButton ([7c52031](https://github.com/RBrNx/wedding-project/commit/7c520314dbee923a4a9a259778e052fa7390359f))
* add title to RSVPOverviewTitle ([99607d0](https://github.com/RBrNx/wedding-project/commit/99607d06e958ed669c216913366619d3d82b0a26))
* add update capabilities to submitRSVPForm mutation ([78a6047](https://github.com/RBrNx/wedding-project/commit/78a60470650320470d568145c9ba1d5256474efb))
* added date to RSVP Card ([95285f6](https://github.com/RBrNx/wedding-project/commit/95285f685a8faf44bd786a10dadc99425a7e2b1b))
* added Spotify logo as custom placeholder to SpotifySearchInput ([8eefe98](https://github.com/RBrNx/wedding-project/commit/8eefe98ab8264b1e787f9e036c027a6777b91c3a))
* allow user to go back from SubmitRSVP Screen ([4496a14](https://github.com/RBrNx/wedding-project/commit/4496a1427d7278c36d23e3b90421399daf5502e4))
* change DashboardScreen Container to be a ScrollView ([7ae7ab4](https://github.com/RBrNx/wedding-project/commit/7ae7ab45531f77a84ddb880115f18c6f31c1f611))
* change h3 to h4 and add new version of h3 ([65ead5f](https://github.com/RBrNx/wedding-project/commit/65ead5fb1cedeec4677bd7b650074e70fc030afe))
* create add + remove track endpoints in SpotifyAPI ([af3c75a](https://github.com/RBrNx/wedding-project/commit/af3c75a71fe439b2845928503bbfa7f1afea37ba))
* create getAnswer helper and add support for SONG_REQUEST questions ([5829d64](https://github.com/RBrNx/wedding-project/commit/5829d64a9d568870bc7267a8a2ceab399819b23c))
* create initial version of Dashboard screen ([b7b166d](https://github.com/RBrNx/wedding-project/commit/b7b166dcf310b27092de501c88475f93e0b548ed))
* create initial versions of DashboardHeader, MemoriesCard and RSVPCard components ([48b4513](https://github.com/RBrNx/wedding-project/commit/48b4513f2ea48a41c49182f2c4154d25574f8083))
* create lint:report scripts ([b6cc8c8](https://github.com/RBrNx/wedding-project/commit/b6cc8c821edf84484916c324d8d0cd796aa31f23))
* create RegistryCard and WeddingDetailsCard components ([78dda8e](https://github.com/RBrNx/wedding-project/commit/78dda8e9e133e900c086d4c6a8e4f11735976bfe))
* create spotify callback handler ([2084a4e](https://github.com/RBrNx/wedding-project/commit/2084a4eaa24c0bb965b9d298d70372a50193ed0a))
* create SpotifyAPI dataource and use it in Music resolvers ([78ebeda](https://github.com/RBrNx/wedding-project/commit/78ebedad80f4f50ba28ddd77e72ddad8f82b8bdb))
* create SpotifySearchInput component, along with useDebounceValue hook and searchTracks GQL query ([a06d934](https://github.com/RBrNx/wedding-project/commit/a06d934439caa6f9776b6b1be67add653fa7706f))
* create useBackButton hook and BottomSheetModal component ([17b0fb0](https://github.com/RBrNx/wedding-project/commit/17b0fb02db9ae46702baf8b41b3a213a7647656c))
* create ViewRSVPSheet component and add it to Dashboard screen ([c703585](https://github.com/RBrNx/wedding-project/commit/c7035859daa06cbb1522ff3f1c7c6a60753c75ba))
* hide RSVPSheet when navigating away from Dashboard ([7c77fd7](https://github.com/RBrNx/wedding-project/commit/7c77fd77592eb47e2edb093aa7bab10b0a437616))
* improve style of submitting state ([497a5b8](https://github.com/RBrNx/wedding-project/commit/497a5b8c198f280bfc07e2a05b61213c7748f59d))
* install react-content-loader ([ef2899b](https://github.com/RBrNx/wedding-project/commit/ef2899b3f410ceffd517841a9dc7ab5e9d3667a9))
* install react-native-user-avatar for Dashboard ([5a70c51](https://github.com/RBrNx/wedding-project/commit/5a70c514a72b820e5e176b423622754644140091))
* move StandardActionButton to modals outer children and animated it's entrance ([48b4ea8](https://github.com/RBrNx/wedding-project/commit/48b4ea8c305e62c55f4926418bf72068b16f9bd7))
* replace lint-api and lint-mobile workflows with lint-repo ([f7c7132](https://github.com/RBrNx/wedding-project/commit/f7c71327d0414efa98fb4b3f75e558149cd918bd))
* replace reviewdog action with eslint-annotate-action on dev workflows ([f1c0e0a](https://github.com/RBrNx/wedding-project/commit/f1c0e0ad056a6cc226952e928c25b69ebf112594))
* set existing answers in rsvpForm ([a029148](https://github.com/RBrNx/wedding-project/commit/a029148e252a39eb6a0d1a76c2d7994d24e96924))
* submitRSVPForm mutation will now update the spotify playlist ([cc31c56](https://github.com/RBrNx/wedding-project/commit/cc31c5681294ce527ed427bc1f8cee5dff9a58e8))
* updated Auth context so that currentUser is always fetched from the cache/api ([a942b10](https://github.com/RBrNx/wedding-project/commit/a942b10b4a7f0ac7d5fc9a4e8be6c49db09ffcf9))
* we no longer require to be navigated straight to the SubmitRSVP screen on login ([c7644f7](https://github.com/RBrNx/wedding-project/commit/c7644f76a7c5df8d518a370d7004d53fc12bfe3c))

## [0.6.2](https://github.com/RBrNx/wedding-project/compare/v0.6.1...v0.6.2) (2021-04-25)


### Bug Fixes

* add 'stgging' ref to expo-publish-staging workflow to see if the latest commit will be checked out ([e93ee37](https://github.com/RBrNx/wedding-project/commit/e93ee3714acd2c80e82ead4d5bcbc951fe1b810f))
* temp add "noop" property to app.json to trigger deploy ([5d183ee](https://github.com/RBrNx/wedding-project/commit/5d183ee5fb17b37b69e4d12aee837ad78ea656fd))

## [0.6.1](https://github.com/RBrNx/wedding-project/compare/v0.6.0...v0.6.1) (2021-04-25)


### Bug Fixes

* add revision id to AppVersion component ([69e7254](https://github.com/RBrNx/wedding-project/commit/69e7254b72a88bc71f3681355784cccff8459f63))

# [0.6.0](https://github.com/RBrNx/wedding-project/compare/v0.5.0...v0.6.0) (2021-04-24)


### Bug Fixes

* checkout HEAD commit instead of event commit when publishing so the latest app.json is included ([7ec61d5](https://github.com/RBrNx/wedding-project/commit/7ec61d54e071dfd60c539028901b620ff78d652c))
* indentation of expo-publish-staging workflow ([653e5a2](https://github.com/RBrNx/wedding-project/commit/653e5a20fff5e9d9b334f57e8460d9f0dc764e5e))


### Features

* add private true flag to package.json ([9a765bc](https://github.com/RBrNx/wedding-project/commit/9a765bce348739b0364c7c78c3f312f54d393ece))
* install and add semantic-release/npm package to release config ([3a89385](https://github.com/RBrNx/wedding-project/commit/3a89385fa8724c0000e2a7e0e49fa9b9dac956f0))

# [0.5.0](https://github.com/RBrNx/wedding-project/compare/v0.4.1...v0.5.0) (2021-04-24)


### Bug Fixes

* replaced custom generatedPassword function with nanoid to generated a random password ([59938a9](https://github.com/RBrNx/wedding-project/commit/59938a902a3d4f85af868328cbd36f083e35f260))
* update awsExports to point at staging env ([b9161ec](https://github.com/RBrNx/wedding-project/commit/b9161ecb513a8d70191be4db198f7381cb2c1d2e))


### Features

* delete cognito user if something goes wrong during creation so that we aren't left with a half created user account ([2134420](https://github.com/RBrNx/wedding-project/commit/2134420a05ea3c76bb65a19c39728b30df9a07e2))

## [0.4.1](https://github.com/RBrNx/wedding-project/compare/v0.4.0...v0.4.1) (2021-04-20)


### Bug Fixes

* allow COGNITO_USER_POOL_ID and COGNITO_APP_CLIENT_ID to be overwritten in local development as !Ref values are not handled well by serverless-offline ([2c40cd6](https://github.com/RBrNx/wedding-project/commit/2c40cd65ad8a066ad933fb5e0c2ed4d6b7c7b92a))
* set BASE_API_URL to published dev API on develop branch ([4ac56c0](https://github.com/RBrNx/wedding-project/commit/4ac56c0fb0b65b3d6546e89d922a266b2f5642b6))
* update env variables to use staging ([25ec05f](https://github.com/RBrNx/wedding-project/commit/25ec05f34b32ff7898cddf849815ee33a25bc3db))

# [0.4.0](https://github.com/RBrNx/wedding-project/compare/v0.3.0...v0.4.0) (2021-04-20)


### Bug Fixes

* add ENV property to help calculate the current environment ([75faab1](https://github.com/RBrNx/wedding-project/commit/75faab126b3d67e415657a4b697b023006e6f56f))
* added stage variable to the IAM roles generated by cognito-identity-pool ([df21c87](https://github.com/RBrNx/wedding-project/commit/df21c877b7e372862171cc1336f139994c3c8e00))
* custom user pool domain now uses the stage variable ([b8bf841](https://github.com/RBrNx/wedding-project/commit/b8bf8417e07c61b5f2dc4b722990d42837e657e6))
* node_modules added to .gitignore ([672bad9](https://github.com/RBrNx/wedding-project/commit/672bad9869ec12ec13fae11fdb873dbbf62b0143))
* stage should be pulled from CLI option and defaulted to 'dev' ([17dd29d](https://github.com/RBrNx/wedding-project/commit/17dd29da1f968ca1a3b9944bb79582c8c70435b6))


### Features

* allow expo-publish-staging workflow to be skipped ([8088b4e](https://github.com/RBrNx/wedding-project/commit/8088b4e2b54c49d143d8d30e33f34728ad7bdad7))
* create deploy-api-staging workflow ([7979755](https://github.com/RBrNx/wedding-project/commit/7979755a6b8fc09607dad2e4d540c0509b245035))

# [0.3.0](https://github.com/RBrNx/wedding-project/compare/v0.2.0...v0.3.0) (2021-04-20)


### Features

* add staging specific changes, skip ci ([551fcf7](https://github.com/RBrNx/wedding-project/commit/551fcf7a9ba102047c246fc9d223515005c95b93))

# [0.2.0](https://github.com/RBrNx/wedding-project/compare/v0.1.0...v0.2.0) (2021-04-20)


### Bug Fixes

* add __resolveType resolver for MutationResponse interface ([5da1a86](https://github.com/RBrNx/wedding-project/commit/5da1a86e2f8081d274e5ad6898e9b7580103eee4))
* add MONGODB_URI, COGNITO_USER_POOL_ID and COGNITO_APP_CLIENT_ID to deploy-api workflow ([5091dfb](https://github.com/RBrNx/wedding-project/commit/5091dfbd69695c0eccbcdfb67e55f7deaf05c77c))
* add needs property to github workflows so they run in sequence ([b15516c](https://github.com/RBrNx/wedding-project/commit/b15516cdc0d2a72204395eafd01df929432c4b86))
* add NODE_OPTIONS and EXPO_USE_DEV_SERVER env variables to expo-publish workflow ([4340905](https://github.com/RBrNx/wedding-project/commit/4340905212cbd8fb6758a6eabefdfcf5909001cb))
* add StatusBar height to CameraViewfinder ([7bbb198](https://github.com/RBrNx/wedding-project/commit/7bbb198d8dbcd959eeb01651275affe53fd56513))
* add Theme colours to NavigationPresets and hide TabBar labels ([1d6a419](https://github.com/RBrNx/wedding-project/commit/1d6a4193623e73844a617b09833408daf0359431))
* add theme support to StandardTextInput's color ([4e6c1fe](https://github.com/RBrNx/wedding-project/commit/4e6c1fe9c21cb67e99b321976fb256e840b0c129))
* add workdir property ([6bb6f02](https://github.com/RBrNx/wedding-project/commit/6bb6f022940743f45c428552ac1263c5b156aa4f))
* add workdir to lint-mobile workflow ([bca1deb](https://github.com/RBrNx/wedding-project/commit/bca1deb37587c96c8eca4a9df94beefb6d8ab642))
* Alert no longer flashes on screen accidentally ([ccbc59a](https://github.com/RBrNx/wedding-project/commit/ccbc59aa7569cd5ca0315503c17d8744e309398f))
* Alert no longer flashes when app is first booted ([1b3139c](https://github.com/RBrNx/wedding-project/commit/1b3139c0c83ee60321eb91048035b6203a2fb60d))
* AlertProvider should be mounted after AppLoader so that fonts are not used before they are loaded ([49c1ddb](https://github.com/RBrNx/wedding-project/commit/49c1ddbb75fc4443ab20046e3eaf5b0ab75f0559))
* audited mobile-client packages ([3e92b4b](https://github.com/RBrNx/wedding-project/commit/3e92b4bf875892f1413861b747e3af16ef52452b))
* calculate topOffset on iOS with react-native-status-bar-height ([c5e7372](https://github.com/RBrNx/wedding-project/commit/c5e7372d387301e75648e54b18d96241e2144372))
* cd before installing modules ([1be7005](https://github.com/RBrNx/wedding-project/commit/1be7005c9f0c65f1699a3c530f059f986420d3e2))
* change default easing to Easing.inOut(Easing.quad) in useAnimatedStepTransition ([25e7c86](https://github.com/RBrNx/wedding-project/commit/25e7c868bbb2526c1bd1ec716a17e449ad113410))
* change entrypoint in an attempt to get the API deployed ([9ef6681](https://github.com/RBrNx/wedding-project/commit/9ef6681c3465a40e4b3d5b44c956c8722d4a3803))
* change export default for module.exports ([833098a](https://github.com/RBrNx/wedding-project/commit/833098af56de2febbc8732eacd60655d3fbdd44c))
* commenting out org property as it seems to require a Serverless login ([0eb8f77](https://github.com/RBrNx/wedding-project/commit/0eb8f7799c22a5e18c9e67dedfd850bbe89cfaa7))
* confetti colours now render on iOS ([6bb7db0](https://github.com/RBrNx/wedding-project/commit/6bb7db0e0a751de472b46d939fe21720c5ca3f75))
* ConfettiCannon now pulls colours from style helpers ([31621bc](https://github.com/RBrNx/wedding-project/commit/31621bcb993ed58e3e3e8784b0469648cbf41a07))
* create TransparentHeader NavigationPreset and update the styles of the OnlyBackButton preset to help keep layouts the same across devices ([e2d17ef](https://github.com/RBrNx/wedding-project/commit/e2d17efcd0bc947aa9234f7c3b005496ad881f2a))
* eslint errors ([06072b4](https://github.com/RBrNx/wedding-project/commit/06072b435c880fcf11803b57aff64aa25bec52ca))
* eslint issue ([97763ba](https://github.com/RBrNx/wedding-project/commit/97763baf02105ab89b57ee0bd06ac03d1f102ef4))
* eslint issue with unescaped apostrophe ([32a4778](https://github.com/RBrNx/wedding-project/commit/32a4778eaba4745154db67c8eff284596eda05fd))
* eslint issues ([ee90126](https://github.com/RBrNx/wedding-project/commit/ee90126b168db246d3fae1dd93969dbe27ff13ef))
* HeaderText should be white at all times ([0f2b5f7](https://github.com/RBrNx/wedding-project/commit/0f2b5f75417d41682e2f7e976d402dbb41307498))
* increase serverless memory to 512mb and the timeout to 30s ([7aeccd0](https://github.com/RBrNx/wedding-project/commit/7aeccd0137a751db81c7dc1c4e9ac73f4785fb44))
* install react-native-async-storage and remove use of deprecated version from React Native ([306be9b](https://github.com/RBrNx/wedding-project/commit/306be9bb5ec90ae78edc8ac208ea15d7276cfe9c))
* install salsprep library to get rid of mongodb warning ([7ae87b5](https://github.com/RBrNx/wedding-project/commit/7ae87b5e4ee260960cf5069ce89ac270c87a3d55))
* manually cd into mobile-client directory ([a38cf51](https://github.com/RBrNx/wedding-project/commit/a38cf5117434f4183d25f1d5cd16a93321f2abc1))
* mispelling in ubuntu-latest ([e2633d4](https://github.com/RBrNx/wedding-project/commit/e2633d4e2a297c44e7ca628e91d5ef63ca871b90))
* pin amazon-cognito-identity-js to 4.5.1 as there are issues with signing in with newer versions ([504d292](https://github.com/RBrNx/wedding-project/commit/504d292698c987dc8a7abcb41b688238de91038a))
* pull_request instead of pull-request ([c808e73](https://github.com/RBrNx/wedding-project/commit/c808e738a12ff172116705212ef638874ce5a214))
* re-add folder change to deploy-api workflow ([ac840b0](https://github.com/RBrNx/wedding-project/commit/ac840b0490635d7aa2fde50ec1eb471f0c3d9827))
* remove center alignment from RSVPOverview ([d08854d](https://github.com/RBrNx/wedding-project/commit/d08854d1bac8ea2fe179e9d8da2111459ded94ae))
* remove fail_on_error flag from linting workflows ([ac7193e](https://github.com/RBrNx/wedding-project/commit/ac7193ef2eea7e229c9761f328dffc807c52cbf2))
* remove overscroll behaviour from BottomSheetFlatList ([065afb4](https://github.com/RBrNx/wedding-project/commit/065afb47f7141a3e37f58eca467cd687e83e57ff))
* remove purposeful eslint error and set import/prefer-default-export to warn ([c46e5df](https://github.com/RBrNx/wedding-project/commit/c46e5dff084ff16985e3e6b071c24bee022cab1e))
* remove unused code ([517a30a](https://github.com/RBrNx/wedding-project/commit/517a30aac92fa75d468b6800fa5f696670e06fec))
* replace workdir with eslint_flags and add fail_on_error ([f6d7dc5](https://github.com/RBrNx/wedding-project/commit/f6d7dc58103911e99ab412df51b18f3989d17fcd))
* request camera permissions from expo-camera module as expo-permissions has been deprecated ([ad7e1d1](https://github.com/RBrNx/wedding-project/commit/ad7e1d174b5f82361e26cb167e089ccfe5f30d1f))
* ScannerButtonCard no longer changes theme ([b3df1e0](https://github.com/RBrNx/wedding-project/commit/b3df1e04dd24842f84cb95c3720628b84b668a00))
* set serverless-offline host to 0.0.0.0 so it can listen to requests on any IP ([729ad62](https://github.com/RBrNx/wedding-project/commit/729ad620ecdf32c8077167cd2a20c63b63ef21dd))
* some straggling relative imports ([af84b4e](https://github.com/RBrNx/wedding-project/commit/af84b4e85b002f1f72ac9d82c21cb20031f60384))
* switch back to workdir and install modules via yarn ([62c9b30](https://github.com/RBrNx/wedding-project/commit/62c9b30adccb63b7d1027b279b912ca80ba10105))
* translate properties should be wrapped in a transform array ([0d9ae00](https://github.com/RBrNx/wedding-project/commit/0d9ae003367d3ebec0133620af0394aad018e161))
* try moving into the wedding-api directory before deployment ([4b8997b](https://github.com/RBrNx/wedding-project/commit/4b8997bf494a9f2e577574d8cc1469a2940f528a))
* try removing cd command from deploy-api ([e1768e6](https://github.com/RBrNx/wedding-project/commit/e1768e60c75f9b2a93e93720e0b287ba7feeb989))
* update all erroring imports ([2211be4](https://github.com/RBrNx/wedding-project/commit/2211be4f97d147c045e84f043dc290a6bf997062))
* update getAllInvitations query to return the rsvpForm ([4f3a972](https://github.com/RBrNx/wedding-project/commit/4f3a9728c39513cb3e10ba02700795854de82b37))
* use auto generated github token ([267c075](https://github.com/RBrNx/wedding-project/commit/267c0756dfa436fd4f2c7fde7852fbff1315251e))
* use AWS Keys instead of Serverless Access Key ([0a01f0f](https://github.com/RBrNx/wedding-project/commit/0a01f0f84855c4762e275012c05037d65f357f44))
* use InvitationGroup model instead of Invitation ([2ffbed0](https://github.com/RBrNx/wedding-project/commit/2ffbed047dc5e7d9abeb7330bad126d8079168cd))
* useAnimatedStepTransition hook no longer crashes when options are not provided ([96191fd](https://github.com/RBrNx/wedding-project/commit/96191fd95667b9609d6ddbbccf690c221fcc4a19))


### Features

* ActionButton on RSVPForm now avoids the keyboard ([305c6ba](https://github.com/RBrNx/wedding-project/commit/305c6ba0d642bec9cff375520b66664cfd46d180))
* add ability to customise duration and easing of useAnimatedStepTransition ([33746ee](https://github.com/RBrNx/wedding-project/commit/33746eebc89e4d0d52c9e3659deae26aeec4e974))
* add alias to assets folder amd change all paths to absolute ([63493db](https://github.com/RBrNx/wedding-project/commit/63493dbc00b39616aea7e4c5984862d2aa722610))
* add animation to hide svg mask when Scanner Mode is changed ([e916946](https://github.com/RBrNx/wedding-project/commit/e916946d3abc8ad572ab570ad1208a16c8c2f66d))
* add animations to Heading and ButtonCard in Scanner.js ([b430ba8](https://github.com/RBrNx/wedding-project/commit/b430ba8df90be70c36badae63510eaf250cc2ec9))
* add cardPressed property to Theme, and darkerGrey colour to Colours ([beb530b](https://github.com/RBrNx/wedding-project/commit/beb530b70bb58e8c336098b7c08d2dab4d55cbc2))
* add cream, lightGrey and darkGrey colours ([d54af29](https://github.com/RBrNx/wedding-project/commit/d54af295fa7b3257200de2f493f99ff29ff0d7b1))
* add create-release step to expo-publish-staging workflow ([f7979a6](https://github.com/RBrNx/wedding-project/commit/f7979a66f82a7d8746d8b1bb792f06f9417bbb1d))
* add DismissKeyboard component to Scanner ([228c6d6](https://github.com/RBrNx/wedding-project/commit/228c6d62852849c64c4d61ccd37f9e013d497269))
* add env variables to serverless.yml ([894398d](https://github.com/RBrNx/wedding-project/commit/894398d7fcd83f9ef340eaeaaaef609955471bd3))
* add lint job to deploy-api and expo-publish workflows ([7252d1b](https://github.com/RBrNx/wedding-project/commit/7252d1b2860026c4e26bc32be88e9c7d681515e6))
* add LoadingIndicator to Scanner.js ([594ef82](https://github.com/RBrNx/wedding-project/commit/594ef8210b7508a208d6357e569af730e511006a))
* add module resolver for library, context, screens and navigation paths ([305adbf](https://github.com/RBrNx/wedding-project/commit/305adbf51ca83e305119e89db1614158657e1696))
* add placeholder property to Question model and implement it in the mobile app ([57b7741](https://github.com/RBrNx/wedding-project/commit/57b7741593b706090533bf9d2f078767a4191577))
* add reviewdog linting to lint-api workflow ([03099e3](https://github.com/RBrNx/wedding-project/commit/03099e330339728e2b084c78ddba24303f23b4ce))
* add semantic-release packages to mobile-client ([7637259](https://github.com/RBrNx/wedding-project/commit/7637259e5aae464c71945797c11cb9e193653abd))
* add theme support to LoadingIndicator with the helper of the new colouriseLottie helper ([8b91f27](https://github.com/RBrNx/wedding-project/commit/8b91f27a804ad510e4dd5138bd55b4c2d8e9c14c))
* add theme support to StandardRadioInput ([e38b0b6](https://github.com/RBrNx/wedding-project/commit/e38b0b6a89f0f949a089e2332105dc36bd3985d2))
* add theme support to StandardTextInput ([f717a79](https://github.com/RBrNx/wedding-project/commit/f717a797086cbdb93188876bb6e1ae605a912013))
* add theming to Edit Button in RSVPOverview ([495efbc](https://github.com/RBrNx/wedding-project/commit/495efbc9ef7f80eb7c21649a9aad3fab80465659))
* add tint-color and resize-mode properties to jsconfig ([99a5d43](https://github.com/RBrNx/wedding-project/commit/99a5d435e36eb266ac9bedcfc69e2eb8edd01092))
* add viewfinder to Scanner.js along with moving the flash toggle to the navigation header ([3adb96b](https://github.com/RBrNx/wedding-project/commit/3adb96b73af5b071b7a3b3a3ea67e71e4b70597c))
* added onLayout support to StandardPressable ([60a051d](https://github.com/RBrNx/wedding-project/commit/60a051d157b52b563b792880541c61781862e46f))
* added the ability to pass custom handlers to useAvoidKeyboard ([52da5ef](https://github.com/RBrNx/wedding-project/commit/52da5ef81b37656bb5212a0d1915a9090f83f681))
* attempt to direct user to the RSVPForm if they haven't filled one out ([844423c](https://github.com/RBrNx/wedding-project/commit/844423ca928b1263ea8483eeffa203f5650c153b))
* BottomSheetScrollView now avoids the keyboard ([0bb1639](https://github.com/RBrNx/wedding-project/commit/0bb1639316d16e6d2760bb0b2bdd3d05ba9b1dd8))
* converted Spacer to styled-component ([b29d6b5](https://github.com/RBrNx/wedding-project/commit/b29d6b5e7e647af670ab61f209458cc4f6468767))
* create AlternativeTextInput component ([f255cc1](https://github.com/RBrNx/wedding-project/commit/f255cc158144f3ca13f29de86a22a31456457a89))
* create AppVersion component and add it to the SignIn screen ([19afadf](https://github.com/RBrNx/wedding-project/commit/19afadf96792bde5a255d540e05d7fb094984172))
* create background and bodyTextColour styles ([0e4f7ca](https://github.com/RBrNx/wedding-project/commit/0e4f7ca2ae884c998213487759eabd3f6f513bb2))
* create CameraViewfinder component ([c2509a9](https://github.com/RBrNx/wedding-project/commit/c2509a97e35c530ee4edf937b71c9e46af95dc29))
* create colours, layout, outlines, typography and theme files to control the overall style of the app ([ea6b4e5](https://github.com/RBrNx/wedding-project/commit/ea6b4e5bd8ab9fc29de101bd3a71885fcd201cfc))
* create CurrentTheme context to remove theme dependency in AppNavigator ([9c201c0](https://github.com/RBrNx/wedding-project/commit/9c201c0f77bdf6f72f15d977b7fa57179cb0deb2))
* create custom Pressable component which supports merging a style function into a styled-component style ([a3cd6dd](https://github.com/RBrNx/wedding-project/commit/a3cd6dd86ff8aa1a6d457a2fbb0b9b26981c23a8))
* create fade and opaque helper methods ([44e4eb0](https://github.com/RBrNx/wedding-project/commit/44e4eb0c5833c2634973ac52ae3827d08620340d))
* create inputBorder style ([bd45d72](https://github.com/RBrNx/wedding-project/commit/bd45d7293a3c702bdcb921808f0a644d46dcfc70))
* create lint-api and lint-mobile workflows ([e157c37](https://github.com/RBrNx/wedding-project/commit/e157c376fdf37e05e654b1ea5963e8f74b3819a8))
* create release.config.js ([dfaddbb](https://github.com/RBrNx/wedding-project/commit/dfaddbb8a9c8bf6e9dcff0c79d41e7ce4f2a9094))
* create ScannerInputCard and use it in the Scanner screen ([820e398](https://github.com/RBrNx/wedding-project/commit/820e398d548262f019ba350290dc068730a56045))
* create staging workflow for Expo Publish ([73a02dc](https://github.com/RBrNx/wedding-project/commit/73a02dcdd9b2d01e4d6bb7cb268fb87a84ea1a79))
* create useAvoidKeyboard hook and use it in ScannerButtonCard ([8fbb71f](https://github.com/RBrNx/wedding-project/commit/8fbb71fc2ab271b00d057a9bfbf4feae03a9f3db))
* created LottieAnimation helper component ([c5f3418](https://github.com/RBrNx/wedding-project/commit/c5f34189b56a1d42d74b2c135f367760cc0f505a))
* created round lsyout helper ([6a0e0d0](https://github.com/RBrNx/wedding-project/commit/6a0e0d08149485e4ce8641c364d2a4060687a446))
* enable absolute paths from src directory ([929eb9e](https://github.com/RBrNx/wedding-project/commit/929eb9eb32cee2d349b890c43995d00b3009484b))
* install styled-components and styled-theming packages ([f01b834](https://github.com/RBrNx/wedding-project/commit/f01b8348b91a3d4441c5535cf0c710c41d740993))
* installed and initialised sentry ([158d8b9](https://github.com/RBrNx/wedding-project/commit/158d8b9c1620d9fff7e3bdb827b9c5ef24485a3a))
* move remaining components into new library and delete unused files ([49e9523](https://github.com/RBrNx/wedding-project/commit/49e95232161d5cd68e1398c8d56137dbf6febe16))
* pass base colours into NavigationContainer so that React Navigation compnents render correctly ([a0f4ec0](https://github.com/RBrNx/wedding-project/commit/a0f4ec0808baa803c094d989631e2023d10cf265))
* perform expo upgrade to SDK 41 ([11e2f9f](https://github.com/RBrNx/wedding-project/commit/11e2f9f1488d3591b0f911997467d22f0332260f))
* remove serverless-dotenv-plugin and dotenv packages and replace them with the useDotenv flag in serverless.yml ([7e83f4b](https://github.com/RBrNx/wedding-project/commit/7e83f4b3de17f0decddfd7683446f416364d137a))
* remove stage from api url when running locally ([584e1da](https://github.com/RBrNx/wedding-project/commit/584e1da96b6693260cc1d31659d451336d31cdbd))
* renamed grey colours to numerical, renamed typography variables to closer mirror html terms, added detailTextColour and icon properties to theme ([d0f9252](https://github.com/RBrNx/wedding-project/commit/d0f925208c7b7191bfe76a1918d9b28df8b78801))
* return label from getRSVPQuestions ([ea2bf22](https://github.com/RBrNx/wedding-project/commit/ea2bf2255cb4896f129d15b03cb737a29a4b2675))
* StandardRoundPressable now takes a colour prop and uses it to automatically create a pressed style ([2384533](https://github.com/RBrNx/wedding-project/commit/2384533c4b529abeaedc6305471e6e1633eea988))
* throw an error if MONGODB_URI is falsey ([4adc6e1](https://github.com/RBrNx/wedding-project/commit/4adc6e1ac56becbf98c8347e4cd9f5235a9a1514))
* throw error during signIn if shortId is not 12 characters ([771ab18](https://github.com/RBrNx/wedding-project/commit/771ab18fa05ee6ff0e7a42fe41b5e9d3574e41e8))
* tweak camera styling and add guidance text to Scanner ([7d77f6d](https://github.com/RBrNx/wedding-project/commit/7d77f6d185c4168a93b6d3eaa40c223016ed1d39))
* update structure of RSVP feature folder ([7fe7b3c](https://github.com/RBrNx/wedding-project/commit/7fe7b3c0d49f060ce44e13cf4cb377d780762bbe))
* updated styling of permissionContainer to fit in with updated Scanner ([277b5bc](https://github.com/RBrNx/wedding-project/commit/277b5bcb323fb2f27ffc55ce68c6aad8b75ecd2f))
* upgrade serverless-offline and serverless-webpack pacakges to their latest versions and get rid of deprecation warnings from serverless CLI ([4ce7e94](https://github.com/RBrNx/wedding-project/commit/4ce7e9431c3e5c31371f335cc603c30cda80ad22))
* use babel-plugin-import-graphql to allow absolute imports of GQL files ([6ddefb6](https://github.com/RBrNx/wedding-project/commit/6ddefb6174b9493663afedc33448c60aa7a0dbd8))
* use custom Alert in Scanner instead of default RN alert ([1b15822](https://github.com/RBrNx/wedding-project/commit/1b158224567f5cdc586888ca997fc60d1874412b))
* vibrate when Barcode is scanned ([a123eea](https://github.com/RBrNx/wedding-project/commit/a123eeace480b50066a59ec04c5d81b3f6e67b9f))
* wrap NavigationContainer in the ThemeProvider to enable styled-components/styled-theming ([c2ccb65](https://github.com/RBrNx/wedding-project/commit/c2ccb657e7d00d017636cf36040141f55e091293))


### Reverts

* Revert "refactor: move App.js and all navigators into src folder" ([ec3a841](https://github.com/RBrNx/wedding-project/commit/ec3a841977acf73f59894e2c8b3a03522cc63cbd))
* Revert "fix: updated graphql file paths" ([39f6209](https://github.com/RBrNx/wedding-project/commit/39f6209fa7db822459a916a87be746aad2706b60))
* Revert "Revert "fix: prettier formatting"" ([14ac86f](https://github.com/RBrNx/wedding-project/commit/14ac86fd1d6715acd4be3a191fe284303ebe2f2f))
