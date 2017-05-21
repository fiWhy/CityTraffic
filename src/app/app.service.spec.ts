import { mock } from "angular";
import { spy } from "sinon";
import { AppService } from "./app.service";

describe("App service", () => {
    let AppService;
    let $scope;
    let $firebase;
    let defaultWindowFirebase;

    beforeAll(() => {
        defaultWindowFirebase = window['firebase'];
    })

    beforeEach(mock.module("app"));
    beforeEach(mock.module({
        AuthService: {},
        AuthProvider: {
            connect() { },
            authenticate() { }
        },
        RequestProvider: {},
        GeoService: {},
        ToastService: {},
        CoreConstants: {},
        $firebaseObject: () => ({
            $bindTo() { }
        }),
        $firebaseAuth: () => ({
            GoogleAuthProvider() { }
        })
    }))

    beforeEach(inject((_AppService_, $rootScope) => {
        AppService = _AppService_;
        $scope = $rootScope.$new();
    }))

    beforeEach(() => {
        window['firebase'] = {
            database: () => ({
                ref: () => ({
                    child: () => ({})
                })
            }),
            auth: {
                GoogleAuthProvider: function () { }
            }
        };
        $firebase = () => ({
            $bindTo() { }
        });
    })

    afterAll(() => {
        window['firebase'] = defaultWindowFirebase;
    })

    it("should initiate itself", () => {
        expect(AppService).toBeDefined();
    })

    it("should initiate connect to server", () => {
        let spied = spy(AppService, "connect");
        AppService.connect($scope);
        expect(spied.calledOnce).toBeTruthy();
    })
})