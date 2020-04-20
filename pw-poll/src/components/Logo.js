import React from "react";

export default function Logo({ width, height, ...props }) {
  const w = width || 60;
  const h = height || 60;
  return (
    // prettier-ignore
    <svg {...props} width={w} height={h} viewBox="0 0 612 608" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M611.746 225.581V525.289L511.843 607.818H0.746002V293.631L149.876 225.581H611.746Z" fill="#DADADA"/>
<path opacity="0.1" d="M611.746 225.581V226.782L575.882 250.788L511.843 293.631H0.746002L149.876 225.581H611.746Z" fill="black"/>
<path opacity="0.1" d="M611.746 225.581V525.289L511.843 607.818L512.567 292.907L575.882 250.788L611.167 225.581H611.746Z" fill="black"/>
<path d="M477.094 266.845H165.803L188.969 253.814H487.23L477.094 266.845Z" fill="#606060"/>
<path d="M397.526 227.383C397.526 227.383 397.977 232.351 398.88 232.803C399.784 233.254 406.558 244.545 398.88 246.803C391.203 249.061 386.687 248.158 384.88 249.061C383.074 249.964 351.461 251.771 351.009 246.803C350.558 241.835 366.364 240.932 366.364 240.932C366.364 240.932 380.816 231.448 383.074 226.48C385.332 221.512 397.526 227.383 397.526 227.383Z" fill="#2F2E41"/>
<path d="M489.203 236.416C489.203 236.416 500.042 254.932 497.332 257.19C494.623 259.448 468.233 267.677 464.364 268.029C459.397 268.48 455.784 264.416 459.848 262.158C463.913 259.9 472.494 250.416 472.494 247.254V239.125L489.203 236.416Z" fill="#2F2E41"/>
<path d="M372.235 89.6413C372.235 89.6413 364.106 66.609 358.235 73.8348C352.364 81.0606 367.268 93.2542 367.268 93.2542L372.235 89.6413Z" fill="#A0616A"/>
<path d="M499.59 115.383C499.59 115.383 509.074 127.125 494.171 146.093L469.332 177.706C469.332 177.706 484.687 202.093 485.139 214.738C485.59 227.383 488.752 224.674 489.655 230.093C490.558 235.513 494.623 232.803 491.461 236.867C488.3 240.932 476.558 244.545 472.945 241.383C471.702 240.247 470.732 238.844 470.106 237.28C469.481 235.716 469.216 234.032 469.332 232.351C469.332 230.545 463.01 220.158 462.558 216.996C462.106 213.835 445.397 188.093 445.397 188.093C445.397 188.093 439.977 172.738 446.3 164.158C452.623 155.577 456.801 143.407 456.801 143.407C456.801 143.407 438.171 165.964 425.074 171.383C425.074 171.383 420.106 172.287 421.01 174.545C421.913 176.803 421.01 178.158 419.655 180.416C418.3 182.674 408.816 208.867 405.655 215.642C402.493 222.416 403.848 226.48 400.235 228.738C396.622 230.996 380.364 229.19 380.364 226.932C380.364 224.674 382.622 218.803 383.977 215.642C385.332 212.48 396.171 175.9 395.268 169.577C394.364 163.254 395.719 154.674 402.493 151.061C409.268 147.448 443.59 118.093 445.397 118.093C447.203 118.093 499.59 115.383 499.59 115.383Z" fill="#2F2E41"/>
<path d="M408.816 44.4799C419.292 44.4799 427.784 35.9878 427.784 25.5122C427.784 15.0365 419.292 6.54437 408.816 6.54437C398.34 6.54437 389.848 15.0365 389.848 25.5122C389.848 35.9878 398.34 44.4799 408.816 44.4799Z" fill="#A0616A"/>
<path d="M424.171 27.3186C424.171 27.3186 430.042 37.7057 437.268 39.0606C444.493 40.4155 418.3 61.1897 418.3 61.1897C418.3 61.1897 411.977 41.3187 406.558 40.4155C401.138 39.5122 424.171 27.3186 424.171 27.3186Z" fill="#A0616A"/>
<path d="M445.848 138.416C445.848 138.416 432.751 158.738 440.881 162.351C449.01 165.964 453.526 141.125 453.526 141.125L445.848 138.416Z" fill="#A0616A"/>
<path d="M421.216 23.3697C420.488 23.2778 420.258 22.3593 420.135 21.6359C419.479 17.7618 416.592 14.0882 412.713 13.4628C411.23 13.2655 409.723 13.387 408.291 13.8192C406.239 14.3821 404.314 15.3299 402.616 16.6122C401.786 17.3713 400.825 17.9745 399.781 18.3928C399.069 18.6018 396.047 19.9453 395.341 20.1726C393.788 20.6724 392.504 22.2974 390.905 21.9756C389.375 21.6678 388.794 19.8207 388.548 18.2799C387.988 14.7696 389.997 9.53189 391.995 6.59159C393.511 4.36032 396.076 3.0762 398.641 2.24079C401.646 1.32867 404.734 0.715185 407.859 0.409226C412.078 -0.0890442 416.448 -0.353403 420.491 0.950707C424.534 2.25482 428.216 5.44496 428.97 9.6257C429.128 10.4966 429.157 11.3886 429.35 12.2523C429.82 14.3594 431.214 16.1305 432.027 18.1303C432.614 19.599 432.886 21.1744 432.827 22.7549C432.767 24.3353 432.377 25.8857 431.682 27.3062C430.556 29.5708 428.598 31.7471 429.02 34.2407L425.535 31.4927C425.032 31.2066 424.641 30.7564 424.43 30.2172C424.218 29.6781 424.198 29.0826 424.372 28.5303L424.878 24.1665C425.054 23.3759 424.975 22.5501 424.652 21.8072C423.103 19.1014 422.43 23.5228 421.216 23.3697Z" fill="#2F2E41"/>
<path opacity="0.1" d="M453.977 107.254L449.723 124.944C454.014 125.097 459.69 125.179 465.706 125.061C467.223 120.509 468.673 115.763 469.784 111.319C473.848 95.0606 467.074 70.2219 463.461 58.4799C459.848 46.738 450.816 43.5767 450.816 43.5767C447.113 44.8789 443.615 46.7038 440.429 48.996C434.558 53.0606 453.977 107.254 453.977 107.254Z" fill="black"/>
<path opacity="0.1" d="M450.364 106.351L445.934 124.768C447.018 124.831 448.292 124.89 449.723 124.944C453.065 125.061 457.247 125.138 461.777 125.106C463.407 120.27 464.983 115.166 466.171 110.415C470.235 94.1574 463.461 69.3186 459.848 57.5767C456.235 45.8347 448.332 58.7057 448.332 58.7057C448.332 58.7057 451.493 51.0282 445.622 55.0928C439.752 59.1573 450.364 106.351 450.364 106.351Z" fill="black"/>
<path d="M410.622 67.0606L405.732 68.8729C405.732 68.8729 403.397 79.2541 404.3 81.0606C405.203 82.8671 405.655 81.5122 404.3 85.1251C402.945 88.738 398.88 98.2219 398.429 99.5768C397.977 100.932 372.235 90.9961 372.235 86.0284C372.235 86.0284 366.816 92.351 364.106 93.7058C364.106 93.7058 393.913 115.383 397.977 118.093C402.042 120.803 404.3 119.448 407.913 116.286C411.526 113.125 426.88 86.9316 426.88 86.9316L410.622 67.0606Z" fill="#CA4242"/>
<path d="M405.655 69.7703C405.655 75.6413 423.268 92.3509 423.268 92.3509L439.977 106.351C439.977 106.351 440.429 111.319 442.235 111.77C444.042 112.222 446.3 112.222 444.493 114.932C442.687 117.641 438.171 123.512 442.235 124.415C443.461 124.602 444.696 124.719 445.934 124.768C447.018 124.831 448.292 124.89 449.723 124.944C453.065 125.061 457.247 125.138 461.777 125.106C463.064 125.102 464.374 125.087 465.706 125.061C482.781 124.723 502.562 122.758 500.945 116.286C498.236 105.448 500.042 101.835 494.171 95.9638C488.3 90.0928 478.816 69.7702 478.816 69.7702C478.816 69.7702 459.848 37.7057 444.042 37.7057L440.759 36.8431C439.233 36.4412 437.62 36.5293 436.147 37.0951C434.674 37.6608 433.417 38.6754 432.553 39.9953C429.383 44.8231 424.383 52.076 421.461 54.4153C416.945 58.0283 416.24 55.436 416.24 55.436C416.24 55.436 405.655 63.8993 405.655 69.7703Z" fill="#CA4242"/>
<path d="M449.01 42.6735C449.01 42.6735 458.042 45.8347 461.655 57.5767C465.268 69.3187 472.042 94.1574 467.977 110.416C463.913 126.674 455.332 146.996 455.332 146.996C455.332 146.996 446.752 140.674 443.59 142.028L452.171 106.351C452.171 106.351 432.752 52.1574 438.623 48.0928C441.809 45.8006 445.307 43.9757 449.01 42.6735Z" fill="#CA4242"/>
<path d="M446.868 260.371L321.921 0L113 100.257L189.836 260.371H446.868Z" fill="#F2F2F2"/>
<path d="M279.639 102.202L168.674 155.452L171.979 162.339L282.944 109.089L279.639 102.202Z" fill="#3F3D56"/>
<path d="M309.018 163.424L198.053 216.674L201.358 223.561L312.324 170.311L309.018 163.424Z" fill="#3F3D56"/>
<path d="M329.2 66.1788L301.65 79.3995L314.87 106.95L342.42 93.7289L329.2 66.1788Z" fill="#3F3D56"/>
<path d="M358.579 127.401L331.029 140.622L344.25 168.172L371.8 154.951L358.579 127.401Z" fill="#3F3D56"/>
<path d="M331.098 47.096L319.752 79.378L304.457 74.002L302.364 79.957L323.594 87.418L337.052 49.189L331.098 47.096Z" fill="#57B894"/>
<path d="M360.477 108.318L349.131 140.6L333.837 135.225L331.744 141.179L352.973 148.64L366.432 110.411L360.477 108.318Z" fill="#57B894"/>
<path d="M192.547 450.501C194.221 448.548 195.617 446.873 196.733 445.477C198.129 443.803 199.245 441.43 200.083 438.36C201.199 435.011 201.757 431.103 201.757 426.637C201.757 419.101 201.339 413.798 200.501 410.728C197.71 405.983 195.617 402.494 194.221 400.261C191.151 398.028 187.244 396.075 182.499 394.4C178.033 393.284 172.451 392.725 165.752 392.725H156.123V457.2H160.309C160.868 457.758 162.124 458.037 164.077 458.037H166.589C179.428 458.037 188.081 455.525 192.547 450.501ZM220.597 404.448C222.272 409.472 223.109 415.752 223.109 423.288C223.109 430.824 221.993 436.964 219.76 441.709C217.527 446.454 215.434 449.804 213.48 451.757C211.805 453.711 209.852 455.804 207.619 458.037C197.292 465.294 184.452 468.923 169.101 468.923H165.752C164.636 468.364 163.659 468.085 162.821 468.085C160.868 468.085 159.193 468.085 157.797 468.085C156.681 468.085 156.123 467.806 156.123 467.248V509.115C156.681 509.673 157.797 509.952 159.472 509.952L172.869 511.208V520H119.28V511.208L130.584 509.952C132.259 509.952 133.096 509.812 133.096 509.533C133.096 508.975 133.236 508.556 133.515 508.277C134.352 507.998 134.771 507.3 134.771 506.184V396.912C134.771 394.121 133.375 392.725 130.584 392.725L117.605 391.469V382.259H166.589C174.125 382.259 182.778 382.956 192.547 384.352C198.687 386.027 204.269 388.399 209.293 391.469C213.759 395.098 217.527 399.424 220.597 404.448ZM374.689 523.768H359.198L325.705 409.891L291.793 523.768H277.139L243.646 394.4L231.505 391.469V382.259H278.814V391.469L266.254 392.725C265.696 392.725 265.277 392.865 264.998 393.144C264.998 393.423 264.719 393.842 264.161 394.4V396.912L288.862 489.437L321.099 382.259H336.171L370.083 492.787L391.854 396.912C392.133 396.354 392.273 395.935 392.273 395.656C392.273 395.098 392.133 394.679 391.854 394.4C391.854 393.284 391.017 392.725 389.342 392.725L376.363 391.469V382.259H418.23V391.469L405.67 394.4L374.689 523.768Z" fill="#CA4242"/>
</svg>
  );
}
