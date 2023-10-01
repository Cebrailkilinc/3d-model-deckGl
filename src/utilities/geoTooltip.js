export default function getTooltip({ object }) {
    return (
        object && {
            html: `\
    <div><b>Average Property Value</b></div>
    <div>${object.properties} / parcel</div>
    <div>${object.properties} / m<sup>2</sup></div>
    <div><b>Growth</b></div>
    <div>${Math.round(object.properties.growth * 100)}%</div>
    `
        }
    );
}