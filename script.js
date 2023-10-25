fetch('data.json').then(function (response) {
    response.json().then(function (data) {
        let gagnants = [];
        data.forEach((element, iAnnee) => {
            let gagnant = [];
            element.result.forEach((univ) => {
                if (univ.charts[0] == element.winner[0]) {
                    gagnant.push(univ);
                }
            })
            gagnants.push(gagnant);
        });
        console.log(gagnants);
        d3.select('svg').style('background-color', 'rgba(110, 98, 157, 0.55)');

        const barre = d3.select('g.graph').selectAll('g')
            .data(gagnants)
            .join('g')
            .attr('id', (dataG, i) => 2015 + i)
            .attr('transform', (dataG, i) => `translate(${(5 + (300 / 9) * i)}, 0), scale(1, -1)`)
            .selectAll('g')
            .data(dataG => dataG)
            .join('g')
            .attr('class', dataU => dataU.university.replaceAll(' ', '').toLowerCase())
            .attr('transform', (dataU, i, dataG) => `translate(${((300 / 9 - 5) / dataG.length) * i}, 0)`);


        barre.append('rect')
            .attr('width', (dataU, i, dataG) => (300 / 9 - 5) / dataG.length)
            .attr('height', dataU => dataU.charts[0] * (160 / 3))
            .attr('fill', dataU => dataU.color);

        barre.append('circle')
            .attr('cx', (dataU, i, dataG) => (300 / 9 - 5) / dataG.length / 2)
            .attr('cy', dataU => dataU.charts[0] * (160 / 3))
            .attr('r', (dataU, i, dataG) => (300 / 9 - 5) / dataG.length / 2)
            .attr('fill', 'white');

        barre.on('mouseenter', function (event, dataU) {
            barre.style('opacity', 0.2);
            d3.selectAll("g." + dataU.university.replaceAll(' ', '').toLowerCase()).style('opacity', 1);
        });

        barre.on('mouseleave', function (event, dataU) {
            barre.style('opacity', 1);
        });

        d3.select('svg')
            .selectAll('g.graph>g')
            .append('text')
            .text((dataG, i) => 2015 + i)
            .attr('transform', 'scale(0.8, -0.8)')
            .attr('y', 12.5)
            .attr('x', 2.25)

        const valeur = d3.select('g.valeurs')
            .selectAll('g')
            .data(["1", "2", "3"])
            .join('g')

        valeur.append('line')
            .attr('x1', -5)
            .attr('x2', 300)
            .attr('y1', data => data * (160 / 3))
            .attr('y2', data => data * (160 / 3))
            .attr('stroke', 'white')
            .attr('stroke-width', 1)
            .attr('stroke-dasharray', '5 5')
            .attr('transform', 'scale(1, -1)')

        valeur.append('text')
            .text(data => data)
            .attr('y', data => (data * (160 / 3) - 5)*-1)
            .attr('x', -15)


    });
});