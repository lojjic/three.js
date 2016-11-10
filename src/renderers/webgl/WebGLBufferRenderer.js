/**
 * @author mrdoob / http://mrdoob.com/
 */

function WebGLBufferRenderer( gl, extensions, infoRender ) {

	var mode;

	function setMode( value ) {

		mode = value;

	}

	function render( start, count ) {

		gl.drawArrays( mode, start, count );

		infoRender.calls ++;
		infoRender.vertices += count;

		if ( mode === gl.TRIANGLES ) infoRender.faces += count / 3;

	}

	function renderInstances( geometry, instanceCount ) {

		var extension = extensions.get( 'ANGLE_instanced_arrays' );

		if ( extension === null ) {

			console.error( 'THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.' );
			return;

		}

		var position = geometry.attributes.position;

		var vertexCount = 0;

		if ( position.isInterleavedBufferAttribute ) {

			vertexCount = position.data.count;

			extension.drawArraysInstancedANGLE( mode, 0, vertexCount, instanceCount );

		} else {

			vertexCount = position.count;

			extension.drawArraysInstancedANGLE( mode, 0, vertexCount, instanceCount );

		}

		infoRender.calls ++;
		infoRender.vertices += vertexCount * instanceCount;

		if ( mode === gl.TRIANGLES ) infoRender.faces += instanceCount * vertexCount / 3;

	}

	return {
		setMode: setMode,
		render: render,
		renderInstances: renderInstances
	};

}


export { WebGLBufferRenderer };
