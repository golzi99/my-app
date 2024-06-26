import {create} from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus component", () => {
    test("status from props should be in state", () => {
        const component = create(<ProfileStatus status={"ir-kamasutra.com"}/>);
        const instance = component.getInstance();
        expect(instance.state.status).toBe("ir-kamasutra.com");
    });

    test("after creations <span> should be displayed", () => {
        const component = create(<ProfileStatus status={"ir-kamasutra.com"}/>)
        const root = component.root;
        // eslint-disable-next-line testing-library/await-async-query
        let span = root.findByType("span");
        expect(span).not.toBeNull();
    });

    test("after creation <input> shouldn`t displayed", () => {
        const component = create(<ProfileStatus status={"ir-kamasutra.com"}/>)
        const root = component.root;
        expect(() => {
            // eslint-disable-next-line testing-library/await-async-query
            let input = root.findByType("input");
        }).toThrow();
    });

    test("after creations <span> should be displayed with correct status", () => {
        const component = create(<ProfileStatus status={"ir-kamasutra.com"}/>)
        const root = component.root;
        // eslint-disable-next-line testing-library/await-async-query
        let span = root.findByType("span");
        expect(span.children[0]).toBe("ir-kamasutra.com");
    });

    test("input should be displayed in editMode instead of span", () => {
        const component = create(<ProfileStatus status={"ir-kamasutra.com"}/>)
        const root = component.root;
        // eslint-disable-next-line testing-library/await-async-query
        let span = root.findByType("span");
        span.props.onDoubleClick();
        // eslint-disable-next-line testing-library/await-async-query
        let input = root.findByType("input");
        expect(input.props.value).toBe("ir-kamasutra.com");
    });

    test("callback should be called", () => {
        const mockCallBack = jest.fn();
        const component = create(<ProfileStatus status={"ir-kamasutra.com"} updateStatus={mockCallBack}/>)
        const instance = component.getInstance();
        instance.deactivateEditMode();
        expect(mockCallBack.mock.calls.length).toBe(1);
    });
});