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


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('URLs defined', function() {

            //ensure each entrie within the allFeeds array is not blank
            //ensure that the entrie begains with 'http' to validate as a link
            allFeeds.forEach((feed, index) => {
                expect(feed.url).not.toBe('');
                expect(feed.url.startsWith('http')).toBe(true);
            });
        });


        /* TODO: Write a test that loops through each feed
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


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('default hidden menu', function() {

            //ensure the menu is hidden by default
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('menu changes visibility on clicks', function() {

            //Click on menu and expect it to be not hidden
            $('body > div.header > a > i').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);

            //Click on menu again and expect it to be hidden
            $('body > div.header > a > i').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        //Wait for the loadFeed function to complete
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('loadFeed called and work completed', function(done) {

            //create a node list of all 'a' tags within the '.feed' container
            //then expect the node list to contain at least 1 entrie
            var feedList = document.querySelectorAll('.feed a');
            expect(feedList.length).toBeGreaterThan(0);
            done();
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        var originalTimeout;
        var oldFeed;
        var newFeed;

        beforeEach(function() {
            originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
        });

        it('clicks on menu and clicks 2nd feed', function(done) {

            //get first 'a' tag from the '.feed' container
            setTimeout(function(){oldFeed = document.querySelector('.feed > a');
            },800);

            //Click on menu and click 2nd 'a' tag
            setTimeout(function(){$('body > div.header > a > i').click();},1000);
            setTimeout(function(){$('body > div.slide-menu > ul > li:nth-child(2) > a').click();},1100);

            //get first 'a' tag from the '.feed' container after load
            setTimeout(function(){
                newFeed = document.querySelector('.feed > a');

                //expect oldFeed and newFeed to not be identical
                expect(oldFeed.href).not.toBe(newFeed.href);
                done();},1500);
        });

        afterEach(function() {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        });
    });

}());