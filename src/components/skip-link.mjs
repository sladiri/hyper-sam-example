export const skipLink = props => {
    const { render, id, label = props.id } = props;
    return id
        ? render`<a href=${`#${id}`} onclick=${focusSkipLinkTarget({
              id,
          })} class="skipLink">Skip to ${label}</a>`
        : render`<p>NO ID FOR SKIP LINK</p>
        `;
};

export const focusSkipLinkTarget = ({ id }) => () => {
    const target = document.getElementById(id);
    console.assert(!!target, "Skip Link target");
    target.focus();
};
