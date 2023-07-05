describe("mmComponentButton => ", function() {
    describe("Properties => ", function() {
        it("value", function(done) {
            mimi.ready(function() {
                let comp = mimi.create({
                    type: "mmComponentButton",
                    props: {
                        editOnModal: true,
                        value: {
                            type: "mmAddonTextfield"
                        }
                    }
                });

                expect(comp.prop('value')).toEqual({
                    type: "mmAddonTextfield"
                });

                expect(comp.get('button').prop('label')).toEqual('mmAddonTextfield');
                expect(comp.get('form').get(0).prop('value').type).toEqual('mmAddonTextfield');

                comp.destroy();

                done();
            });
        });
    });
});