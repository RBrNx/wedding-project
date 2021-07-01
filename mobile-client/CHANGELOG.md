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
