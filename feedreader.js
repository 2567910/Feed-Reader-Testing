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
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // Loops through each feed in the allFeeds object and ensures it has a URL defined and that the URL is not empty.
        it("have URL defined & not empty", function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
                expect(feed.url).toMatch(/^(http|https):\/\//);
            });
        });
        // Loops through each feed in the allFeeds object and ensures it has a name defined and that the name is not empty.
        it("have name defined & not empty", function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });

    // Test suite named "The menu"
    describe('The Menu', function() {

        var menuHide = $("body").hasClass("menu-hidden");
        // Menu element is hidden by default.
        it("hidden menu as default", function() {
            expect(menuHide).toBeDefined();
        });

        //  Menu changes visibility when the menu icon is clicked. This test has two expectations:
        //     does the menu display when clicked
        //     does it hide when clicked again.

        it("menu display when clicked and hide when clicked again", function() {
            var menuClick = $("a.menu-icon-link");
            menuClick.trigger("click");
            expect($("body").hasClass("menu-hidden")).toBe(false);
            menuClick.trigger("click");
            expect($("body").hasClass("menu-hidden")).toBe(true);
        });
    });

    // Test suite named "Initial Entries"
    describe('Initial Entries', function() {
        // Ensures when the loadFeed function is called and completes its work,
        // there is at least a single .entry element within the .feed container.
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('atleast single entry element within the feed container', function() {
            expect($(".feed .entry").length).toBeGreaterThan(0);
        });

    });

    // Test suite named "New Feed Selection"
    describe('New Feed Selection', function() {
        // Ensures when a new feed is loaded by the loadFeed
        // function that the content actually changes.
        var oldfeed;
        var newfeed;

        beforeEach(function(done) {
            loadFeed(0, function() { //loads the first feed
                oldfeed = $('.feed').html();
                loadFeed(1, function() {
                    newfeed = $('.feed').html();
                    done();
                });
            });
        });
        it('changes the content', function(done) {
            expect(newfeed).not.toEqual(oldfeed);
            done();
        });
    });
}());