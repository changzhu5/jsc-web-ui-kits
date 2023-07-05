describe("mmCard => ", function() {
    describe("Properties => ", function() {
        xit("all", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmContent",
                    props: {
                        style: {
                            width: '400px'
                        },
                        content: {
                            type: "mmCard",
                            props: {
                                vertical: false,
                                image: {
                                    src: "https://picsum.photos/80",
                                    alt: "Hello World",
                                },
                                title: "Hello World",
                                subtitle: "Sub title",
                                description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit."
                            }
                        }
                    }
                }, jQuery("body"));

                done();
            });
        });
    });
});