/*jshint esversion: 6 */
/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {

            //check if allFeeds has been defined
            expect(allFeeds).toBeDefined();

            //ensure allFeeds has at least 1 entrie
            expect(allFeeds.length).not.toBe(0);
        });


        /* The following test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('URLs defined', function() {

            //Cool heads up on the regEx idea. Thanks Udacity and Diego Perini
            var rx = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;

            //Parse each feed with the regular expression to validate url
            for (const feed of allFeeds) {

                //define variable to hold the result of current urls test
                var feedGood = rx.test(feed.url);

                //expect each entrie within the allFeeds array is not blank
                expect(feed.url).not.toBe('');

                //expect current url to be valid
                expect(feedGood).toEqual(true);
            }
        });

        /* The following test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('names defined', function() {

            //ensure each entrie within the allFeeds object has a name key
            //and that the name key is not blank
            allFeeds.forEach((feed, index) => {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            });
         });
    });


    //The following tests focus on the menu icons functionality
    describe('The menu', function() {

        // The following test ensures the menu element is hidden by default.
        it('default hidden menu', function() {

            //expect the menu to be hidden initialy
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /* The followings test ensures the menu changes visibility when the menu
         * icon is clicked, and hides when clicked again.
         */
        it('menu changes visibility on clicks', function() {

            //Click on menu and expect it to be not hidden
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);

            //Click on menu again and expect it to be hidden
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    //The following tests ensure the loadfeed function is getting valid entries
    describe('Initial Entries', function() {

        //Wait for the loadFeed function to complete
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('loadFeed called and work completed', function(done) {

            //create a node list of all 'a' tags within the '.feed' container
            //then expect the node list to contain at least 1 entrie
            var feedList = document.querySelectorAll('.feed a.entry-link .entry');
            expect(feedList.length).toBeGreaterThan(0);
            done();
        });
    });

    //The following test ensures the looadFeed function work properly
    describe('New Feed Selection', function() {

        //define variable for the old and new feeds
        var oldFeed;
        var newFeed;

        //load first feed and set oldfeed variable
        beforeEach(function(done) {
            loadFeed(0);
            oldFeed = document.querySelector('.feed > a');
            done();
        });

        //load 2nd feed
        beforeEach(function(done) {
            loadFeed(1, done);
        });

        //sets newfeed to the first link and compares oldfeed is not equal to newfeed
        it('gets newFeed and ensures its not the same as oldfeed', function(done) {
            newFeed = document.querySelector('.feed > a');
            expect(oldFeed.href).not.toBe(newFeed.href);
            done();
        });
    });
}());