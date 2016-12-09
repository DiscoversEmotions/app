uniform float size;
uniform float scale;
uniform float particle_time;
uniform bool isSecondWorld;
uniform bool isThirdWorld;

#include <common>
#include <color_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <color_vertex>
	#include <begin_vertex>

	if(isSecondWorld == true){
		transformed = vec3(
		mod(transformed.x - (particle_time / 150.0), 100.0), 
		transformed.y, 
		transformed.z);
	} 

	else if(isThirdWorld == true){
		transformed = vec3(
		transformed.x, 
		mod(transformed.y - (particle_time / 700.0), 15.0) + 0.0, 
		transformed.z);
	}

	else {
		transformed = vec3(
		mod(transformed.x - (particle_time / 1200.0), 1000.0), 
		transformed.y, 
		transformed.z);
	} 

	#include <project_vertex>

	#ifdef USE_SIZEATTENUATION
		gl_PointSize = size * ( scale / - mvPosition.z );
	#else
		gl_PointSize = size;
	#endif

	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>

}