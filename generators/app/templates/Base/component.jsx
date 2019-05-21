import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CustomPropTypes from '../../utilities/custom-prop-types';

import {
    markupContextWrapper,
    copyDefaultProp
} from '../../utilities/markup-context';

import defaultScss from './<%= lowercasename %>.module.scss';

class <%= name %> extends Component {
    render() {
        const { copy, classNames } = this.props;
        return (
            <div className={classNames.block}>
            </div>
        );
    }
}

<%= name %>.propTypes = {
    /**
     * ClassNames provided by the contextWrapper, which may have been modified or expanded upon at a higher level.
     * default names described in classNamesApi".
     */
    classNames: CustomPropTypes.classNames.isRequired, // eslint-disable-line react/forbid-prop-types
    /**
     * Copy function provided by the contextWrapper, for rendering translated copy from keys.
     */
    copy: CustomPropTypes.copy
};

<%= name %>.defaultProps = {
    copy: copyDefaultProp
};

/**
 * ClassNamesApi is a mapping of classNames to blocks/elements in the component. this allows implementations
 * to override classNames if they so choose.
 */
<%= name %>.classNamesApi = {
    block: '<%= lowercasename %>'
};

/**
 * DefaultCopy provides fallbacks for the copy function provided by markupContextWrapper
 */
<%= name %>.defaultCopy = {
};

const componentName = '<%= name %>';
const defaultStyles = defaultScss;

const Context<%= name %> = markupContextWrapper(
    componentName,
    defaultStyles
)(<%= name %>);

export default Context<%= name %>;

