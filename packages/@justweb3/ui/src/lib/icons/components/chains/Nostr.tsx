import type { SVGProps } from 'react';
export default function Nostr(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      fill="none"
      viewBox="0 0 223 141"
      {...props}
    >
      <path fill="url(#nostr_svg__a)" d="M0 0h223v141H0z" />
      <defs>
        <pattern
          id="nostr_svg__a"
          width={1}
          height={1}
          patternContentUnits="objectBoundingBox"
        >
          <use
            xlinkHref="#nostr_svg__b"
            transform="matrix(.00388 0 0 .00613 -.101 0)"
          />
        </pattern>
        <image
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATYAAACjCAMAAAA3vsLfAAAAzFBMVEWLR9j7+/v///yLR9f8/Pv///r///v///7///iKR9WHO9mFPNaDNNbFquSKRdj///fo4vCHQNOLSNO3leD///OFQNH6+v3FqOa+neWLSdG+oOaBNtKVV9nRver99/zLseXBouHx6/XWxuuBK9SBOM+sg9+bXdukd9qxjtuALNro2/KRVdqYYtWST9vu4/V6H8rgz++kc9ytiN6IScvOt+bf0u2SWtyda9jXxO3z7vOqg9mKO97Rtu+PVM7l3+6pe9nt7O7JvOOUW8+qd+ObKjVSAAAJoElEQVR4nO2dDXPiOBKGLVkSkmXk2ICJIzAYzMcawkEGBtidLHNz//8/neR8TDKT2Y1zVUty7idJGYhTpbzVanVLLdlxAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgP+dKDl3Cz4goXftSXXuVnwwhJxlbbJ1w8Q9d1M+EK7qMYIQT+e/gcVVIG9iZHQjQdFa6FCAyb0KV18Y0SyMkdVgqcS5W/QhEBG6k42ZH4ovQzC31yCuiZUNY4riGCGQ7XWIxFpb0D9FndDigGyvIfJWBJHiX5EQSRLBiPBKhL8NEI21I4xkLsj2WsSCxIjtQgjaKhF5TW6itlVPRhB7VEGvMYrb9KShi1bAdeW6HacEX+lzN+VjoXSfm9iNNzV00yoIf0hNuEuvfJh4q4S/QUGM6ALG00pE8pvJFljfP3dDPhryBiMUQ/hWkcTPSMxnHdCtEpEeYcIuQbaXMBGGa0O1n38T6S0nrBn+82167yjl2rkh9WI2YGRjBA9BticIJYT09fXmptVq3cx60pfKfR7bJv6aENyCaconiNBfXK2PnHNs4BStbz55PywbJCmJg40C2e4RyuvMCxrY9anYLhvEhBCeDjvyiY9T+YDH6TEH1e5w3T8Wza8Yox8gLJtrO2yWQ2ekWwwhuvXO3Np3gqt0r58GP2pWwvFu4evQlVrrb2tMEcKQXFmEsbQ+peRF1YzBUTRaf+XHorjgdr0vgNzKxmbSX/QZJekvVENxTAlDacxSwozTY0c3qa21fRLSxGZS+r6Yjdovd8+XCWb19GxKSRmq5aA7vOoORheU419b2s/QYR1nKT+FvjObz2diXsZmGJNfubSXIKTdraVj8zc7RBnnx21cQa5HUyPzGvZQN+r0eePObn6K0F4hGs2WNVTNUYvsDWo9gEnX69QvPXCFyAJUxZU9g697f9RPNCObP2pXGDJ/5OjXM3+XG/520RDKZD2X4/Wavr2LWtnO/Q+cA9f5HBAav123msqmJmy3n795JCVFHWMPI9tio8c7ghh9k2z8UNOSGaWUGyNy7N5bHDGZ1etlw/NadlKLmnK+coYYpdwkWMfdOmXxK3Mslqro3M0/F+o6OAq/IIgf+5NFmPvRmrdfpVscXOY1nPi4w5WnROoVT+fa79jKZXd8KjhH7G86K0F0VOsiSqWcvN8X392U1Ps+wvyvdcPtbX7GRr8LXKmfbMYQQmn31F9R9mJoQghBGGc3+qXChroT5nnv9z7+STEDDchFK5S19Wt/gRBu5IwH+F6t8sJJHKfZaj2YT7UHNfW/wJW/36t2FwzTbKE6ofR1btdpzt2694nrRHJiiyRjzLNtSlDM+b4jTHQcSf+2te3eQid9icTf2IShTUczf25e8dXyD6NarveDjGLcTvdgcD/hCn9uPVqwuvXD0AZpTT90fHfWzxpt887kFFkI5vYDQuVfApuhbj3lyFYDsd1vOpkcYmrsLiZBw6QR7S9+bVOrF3CNaHpRmGiX8BttlPFXGPH9fE0Cu1BPMVsNbjLCY77pnLut74hIyNstCVDc/nNqp9PUsixrKOu1MEfr+UJ7413jQHkG51g8IZzwNk4R62vX9kJ5icvIjdAGOkwSHTqu6rTostvgQw/yhAdEeLTFk3jo32kim3aVJgiyw8TWiZSfKbldjruc9sC7PeCebHQbx/K+sFmeGDF5+zL3QvE9NchF4u23INsj/he73swvH8My2cxGU/+F8nkFvu0RtTCiNdrD7zOQSa6NbZ2zTe+fyCsICfqfn6UA4Pj/Dm0GAF7vadvqCLVnhKw6YGCVcDtZwMithAGyAkLofjvlcw9y9CqIcIJTyNCrIpKUBAWsrFTEX3OSXp+7FR+MxJszRCfg2KqhlogEX2q5w+DtRK4uAnKhwa9VQeXjAcMxLEdVIBL+sltg0m55EcxpvBq3M+K8gfAOIrYq6B1HxHzdSvBsryecBbaYLbisZf3ym1G9+Z8M4aKm5ctvxpth1M6S+m7bfht6RdiFCCEXrYTaM57dQkVHRWSTkX0IXbQi3gHDkTHVkQN6DT20Mmo/hAq/N6BANQD4KIj71fgocYUQT+ZDksi8fbZUb274Z9v2rpC+73vfX96dL6m8/Ha/7/kPFUVKest9T+rQ8fxHtL67ejU8ylMOs+x4KPechfOv2bEljaXlt31kjzr6OrgOo7KYd0Bxo4HWJ324eCAz34aLYrTJazdN5zUDhILycQfeJTOvpCN+GyLOYhQjjtHJs48BK+62NLPiX0Xj7ohKhNIdtVdCAr6t3Tyd16SEEDbzhBNeBoSbCE5eNeyWNM5JSgideEnnBpsXDRzw2bjggZ3SDIJ2dmKEtBknBPFJ3SIYr8nK/VS3ypGXATKyqWXbPs9w1T+s7M4EunDyHUN43Zt21zqcN4c7jNj6qnkzxYis9q2jsdZd3abqjLWVe/eKXISXHPFuqNdGyODGuvxmECP8b89fEUR/HwtpfL/0xl2M8Nz35LKB8GqsNxihCx3Vq5uWshEUt/talrJ5CSFxUG7jcLWt4j1KbbdzoOYiL4dMaWUzI4drZCOrcb43smV57WQzHXDEjG6t8ZAZ2XxbJ34sV5mFsk+bY9+08X+xcW7FREfqUTZhOim+WF4djac71G1VupStdWUEo/uWtTZtHxlR3JU0KJ0RhJeht2uXOzrwwIwcT2VDBAfmjvhb3ebqStmuxqMgJserwMo2oYhkvmuFKDd2BFPh6HnBeIwY3zxYW3gvW4oIK6Y1DECsbDIvKLKBBe/KHkOksS9PAPRujPtKO8rop5d9E2kEX+SjbG7P/BJhe0Pdwo+7IQEPQ3Wb2vVlK5t3YcbN1adcKX9pYl6804lMPKHGW9OHD96zTkqKEY35WtcwSyhlc+WkPGnGjKQd00sRT4ez0xc7yPKZE26CVkdrkxUYVZ8PCavxV0aCgV+/TlrKZp9iaM9xs7r4a+PmCTM5KSJxe+sLvcY0LbKApO3N85GU/Dn+j7mZnupWWv4gm5OMd7zspI4yA+f9sR+MHrSj9vb8mXLfvA00nsm20vpgLrxuy4Vel+GGXUqInHDFsZXNDJyXR2NrlONsUh56PTxSyijm/dyxAQhl3MjmTDGjK+2EsfmzrGaHyKpk+rnnlKYSRdPetGf/fdUJZ83B4GqvyzEyyjun7nYw/1xmniKafp46ifmbZW96GzlqMe31pjXbbOQ6ynXdcvueEPadVVCoSMlcSnVf3uAKJaUnRbmjSDjCVSaXcs3Vfpu7XfNB3QJeAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPh/57+KPrhgRwhpEQAAAABJRU5ErkJggg=="
          id="nostr_svg__b"
          width={310}
          height={163}
        />
      </defs>
    </svg>
  );
}