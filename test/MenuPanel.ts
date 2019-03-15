import Selector = JQuery.Selector;
// @ts-ignore
import * as $ from "jquery";


class OpenEvent {
    public menuPanel: Selector;
    public open: Boolean;

    constructor(menuPanel: JQuery.Selector, open: Boolean) {
        this.menuPanel = menuPanel;
        this.open = open;
    }
}

interface IOpenListener {
    onOpen(event: OpenEvent): void;
}

class MenuPanel {
    private readonly menuPanel: Selector;
    private readonly openButton: Selector;

    private openListeners: Array<IOpenListener>;

    public constructor(openButton: Selector) {
        this.openButton = openButton;
        let openButtonTarget = $(openButton);

        if (openButtonTarget.attr("data-toggle") !== "float") {
            throw new Error("bad data-toggle type");
        }

        this.menuPanel = openButtonTarget.attr("data-target");
        this.openListeners = [];

        openButtonTarget.on("click", (event: JQuery.Event, someString: string, someObject: OpenEvent) => {
            this.toggle();
        });

        this.init();
    }

    private readonly init = (): void => {
        if(this.isOpen()) {
            this.open();
        } else {
            this.close();
        }
    };

    public readonly open = (): void => {
        $(this.menuPanel).addClass("in");
        $(this.menuPanel).removeClass("out");

        $(this.openButton).attr('aria-expanded', 'true');

        $("#cover").fadeIn(200);

        let event: OpenEvent = new OpenEvent(this.menuPanel, true);
        this.fireOpenEvent(event);
    };

    public readonly close = (): void => {
        $(this.menuPanel).addClass("out");
        $(this.menuPanel).removeClass("in");

        $(this.openButton).attr('aria-expanded', 'false');

        $("#cover").fadeOut(200);

        let event: OpenEvent = new OpenEvent(this.menuPanel, false);
        this.fireOpenEvent(event);
    };

    public readonly toggle = (): void => {
        if (this.isOpen()) {
            this.close();
        } else {
            this.open();
        }
    };

    private fireOpenEvent = (event: OpenEvent): void => {
        this.openListeners.forEach(value => value.onOpen(event));
    };

    public readonly isOpen = (): boolean => {
        return $(this.openButton).attr('aria-expanded') === "true";
    };

    public readonly addListener = (listener: IOpenListener): void => {
        this.openListeners.push(listener);
    };

    public readonly removeListener = (listener: IOpenListener): void => {
        const index = this.openListeners.indexOf(listener, 0);
        if (index > -1) {
            this.openListeners.splice(index, 1);
        }
    };
}

$(() => {
    new MenuPanel("*[data-toggle='float']");
});