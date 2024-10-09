import type { SVGProps } from 'react';
export default function GoLegacy(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      fill="none"
      viewBox="0 0 225 225"
      {...props}
    >
      <path fill="url(#goLegacy_svg__a)" d="M0 0h225v225H0z" />
      <defs>
        <pattern
          id="goLegacy_svg__a"
          width={1}
          height={1}
          patternContentUnits="objectBoundingBox"
        >
          <use xlinkHref="#goLegacy_svg__b" transform="scale(.00444)" />
        </pattern>
        <image
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAA8FBMVEX///8nNXsdi8sACWSKkbUAD2UpN3xud6UkMnkgLnYmNHoAf8YAfcUAdcIjMXkfjcwAAGAAAF4cKnT09fkVI2/u7/UAecMYiMoAAFkAE2gYJ3IAfsYAcsDf4eoAAGQLGmnX2eWUmbjGytzO4/Ln6fG7v9QRIG7n9PpES4KwttDMz99mb6EACmgAFG1cY5Pj8vm+3vCjqcWaw+MwOHh8t95OVYl+haxwqtg9lc93faRSWYupz+lSotWqsMxdZ5tAS4kAaLyFu+EeIWc2O3bE4fFQmdBosNw2Q4VTpdZKVpE/nNOq1OyTyOYvNXQ6P3gQFmOH9Gh3AAAP2ElEQVR4nO2de1uiThvHPTGAeASUIBU8gMdMK81TtdWW22617//dPGDtpjAMpwm238Pnn732ytRvM8zcc58mkYiJiYmJiYmJiYmJiYmJiYmJiYn5YnCDzPBaZ0jOm1N10OE4LuqvhJXK1c2okSYM0ulGY3SigScy01fqnf+IztZ4JNNJkPwDRbO8LBIn/HacUQf1r69SvSco8KHPYPe/gqFTOx9n+oNK1N8xEANaS8IxdNISL0s9cjr4uiPJvYrARuG7Tn3SavL9sFmP+qv6JFNGC3wbTIrWxOxQjfrL+kE5px0Fvstk00eF5td7IpuyS4G7oZRLhYzyxZ7IpZx1L1HXyKcLmX9w1emenp7Cv1VnzHsQuNMonWQzg5AFoOEmZ5ebh83l2QTyQ2UmeVOoa8yyYu9fWlgnG4F557Jt+akyY70qNDRK8mz6r0zV21xOEFIGglBlfpl/XF/5UKiT5eWVEoEcK4/fhGLqD0Whdmb6OUfaGTSOiKV5JJIOef6W+hBoSMytTa/IeFpL9wH00bYViao92jVhX6AOszg9fIlKU34HMQlELWoL4EfeJDAlVE3zlBvLzlabrURJJCPdONqMkDJzbB7EQYMOIJESX6fRiNvxXLUITAmMectoHgWQmEzydxEuOBeMVWEqZ15OE/MjNohEqjTuRKFOh9tAFBarF5YXNhtiIYBE0HiN6GHsbqyPYSoFUZgYjO9knmVpgwJFZZPA06ACMRvRyfESOoa3kFdyambcu7+/P3+hJE3TeIk1NhHXMoFG90NXZ3CRgz2H5j3/nYrSarVUVb2aNufk7JyX9VF1vVUCXotkSV1b19KiIFjNbzNcR2mpTfJGEmUp627CAlZshqDIzKlgeRCL1U3X3S9znfqgOWZHojvTHNClKCRe1IrmIazaTFIoXKUzXYklzdUTWUhHIfE4Z5JYvXQ5hB/UM6BMuBnGAhHBs9jO7y+nxVRu4fwUQlCvNZF2Hkg6Com/mJzwfoAq6menxXef76MuX2RntyPLRrBpTB4YxjDABUFgchA3hmtacyA7GrDafQQnxtOzjcAc6zJTl2vPz+A+XGspalkHjWIvChfVaXt9dnY2aZ86vxRNRd02nIz00QrHV46Oeqbh5CMvL6P+kgEZnJcp9DAeRXkkxkFlLrIoSw7Qd5H7p4LSv0fOVCDPojoRY2OwaiBnqjj/V/zhvqkvke4r+lNOi+3Jr/Wv74E3BJdUmicoC0fDvytOHhdG/EV4uA1gtXiBmyJcOyBJYJ6np5fVnPBGlXnG+tb2ZEYIDwDdwLqetoX8R3RCqHk/H/lCmSHMGyBLGD+qzVSL+yeksCQ2UTEdcJTB9kHdRfXglFsU8haf76cweEEtNmwD22JzWzP7YhgXziYMcCsNZdoQJKbP6TIWp2gxD3H6fgJLETGGSeoOk5f4l9nZpCtkUh7Xaq4+UPtXOn0vqYgZpPcGyEM8O8YjLL5UhaVd2FDvZ8jZ6zlF85Ik0dnz3opsqq7inmiFyQIml8ZPxjKG+jR1uykqmScpnRZ5tlAoUDr6P6wmpkXqeuoscu7ggdNIHAHi7gIWfcnDYhNmuErzplGG+peyLFE+uVYdZhnpcBimNRyDyC1g0RcXCrl6hm3ItM1JDwDAEqObK9SKX5lJDh4NeYljEDf+ZqmSodI82gMKCvLopm+v0TnHgWZx2G6PlmQEfaXJOWyIneaNKDl7eAGljca2c3XunNUoZjAsp5DdInVcRL+xOpZ5d4EzUNDoJXwYW/fOIRuJwmHYCNYH0cFsy9x5yRKi5R5s6+64SqYq4fBKrb+Zn8JjAXUQ7ozLBffRXQONsFrRXIZwcLkZAHmLQWHih2meogNog9eS18QLQB8Bk2+pMywV3LwNVcKx1nAP1Y/crmJRqJ4hnkL1XPSWhbCTCES5+WHNcZ0+SLsYQeM3iWsMCvUjfo4RdG3GMVjIMWeI46Ga9ZeKCCTifK4OlHpdUVrNpxHqVHHwe+wJFuO0e7Y4zjGMwDA55gFlkvZZ3vsIvn3VLC9roLdazbaSqLmaoW+/d4TJ7dZeXy70Mfx5OUEtMq07j0ndhxRYyUhEoT2lvhNDPArfktXt0tXfUe7dTi6M0C/hOcArK4fyn08B/L4KTeGyEYFA3XILLdo21dwt8Lhhw4rTKL1Aq4x/Ci/hZPVx87RTCP6ToELKeFM1tyVquMlqocTauFkU6+gb/DiM9Ay15L/mICCADSXHhgpQchAUWgohUap/FJ3AJCWHkLP4FN1TqKNhcbkhUcTInsKkkSH9+UtNJu2mXHvnJfUL6q2lG+WTBXIzR3MGJFmZSAeBsE0kBmzhs8sxWi+O9SJaSX5aZoJAbku8jURa8223TS42i8XPx18OUW1kONr4I9ONLYYqu75ss55Rok+7bZ2q1XIMk8vXhFukxiXaNwP4bBOLXVXZwnfdrOjr/bs/arlU0SCVYmqo9O36ClmuDbQeLpujXoB/kq8IzelDfr/+tYoI3bfuUUY34Cl868BUhD4P8tC7wu7lQei3WMylbF1QfRqlEGtuj1KA5tjIPsr3znKmwGgx/2j3Wv1wjxjCNM76SOUGui9pT54VtiFxUdvYfVNDLKUSj9PeqK+gixq/9fwh62NrbDtnk2LCzVEKRRLn8bQzhvorvSvs/oCU3QnmEuZ3KkuEQuoEqxOlQ0IVSsCrwtMFJLQtCPBp2hna22y6QaUElrVHZQmNC3tX2E5B0hMEa9OLHZ0hYsPnt0pgWXvYKfQcCm5b6wpRChF2N3+D9WADVwhYyfMsTUFn6X9oDE9/HkPGUIDXpaEUApZWAsvaA9tz2L0wF04aCh/g5ncFZXhTYhhrKe9ZYWICaXgBrUJPGDkFIe6HQ0z7YeLUkglVFBg7w7SJstokz4sAivoYl00DGcSabaLXFY844gOsjYJswj8+7FLd9K4e9NYRape2L1Up9NkC45OobKEHRD9ni0T3Nv93ohaLTB6Rnz94RZ4PJRrf8Umh4acnH+dDfQFZM7U3y0bXd4zKMOmM0Wd8/h6b170Fj3DJc39eoO6jkK8ZMI/oVESnJEKWX2IK006hrmeffhoDbvJ8cfE8cSogQR6BDai0RGLJzppDs/cp+bNjpMq9g78UALbcKFyTzgwzCuKDKtfQ2UJrnx5eGzvmugJA8SLhghIqAb+zhW0WgMXo67Kh6Tkd0f4vIfcU289R4G0XPj9ukejw/pojwqARlux0BLMPgRZCmHvoIviEQSEJL8DAk7KPRikH6eV1AHtu/1ABqFX6+UupwROBaRCpE/v0e6UB3ZVoKYyUoUEDUzoNe28/hPC+2YANpZsbZ/OIeEZGlIZu4ZuSFEo+TWJAOZXwuAFIr4rtR9hM0qwWTl9Frkn47cS6TxqxaNg0dw8rr00/fntoTW4DIGYIE3oG9wcVXsJqBKIfhAPOUyCVEGcQ9Q46SYC0Cq1NbSag7QYKyLx7+LnCaAMSlkDd5AiWBk2VUCX2tp6E35jO193TyXq9biOT9Sszwme1RdIouBCRRa9NGX4IZc+xTNLuepM6zuVyTPGijdCooFvnoEG7k+oreHQEpLGU5X/fMNW3nmxMVbhF1JS0XpEl9CjEFXLftsuTx1Mzsxb+9tVLFZncBiWx5y9LUd8nkAJtXMG6QSNiEPidYfYTT4QqSuKgN/KhL1l+Qj9NfdFmCMs4ioKEwzBNMZW/RT2Ls7K3+spd/eET+it0tjb1RlQDg9X9aCkEFqoo7yK3LEvellRYDekhdm4SIN8EF9itWvvM2ufW7Ji+eMmotakD3qdu12sw28Bgkz5DarkZAe1CHZC8kwv1fQwAbVvLvYdtkjVvrq71w2PVqtA+e+gdbrqSXZRBoevx/9I/sinHyRI46vFhnT9Szj0V6tObtIzWCGh51EP0VPiDkrU7emJxlHZhfTFcKExwusYGYdtYASSl9MmTC30JjrTdYkWfEZnD9/fb+SNhtCO9FsvlXXcFsK9NP9PxpbJGtlxNMXg0xoBmsbigYJ0/3IzhG5WrIZDThMyzdGGHcfMhkZa3w77LJ0i1z+2Ul1hyBC7yVoGOnT/24QbT+XDXZIimaOr8dTacT90/PorNyd6YCBQeL+LE0upLX0oXXv94lfpA3TGoe3p0KmTa1kKScTX7Wlhza0Jq2KaTgfvXdkOIrVHrpGY2anI2eZj4aTZsew+ANL4K54vDeVoUGC+t84MwLdk6t4A0wueA6m72R7HIhDZHp6K99w4c4SzJ617WPjbFvKfLD4Iw/Y0QiKcxzQfrxVsDU6Za3YTUohU5gkmWUDB/XHd98bBYPGxuPTTbCwQ3le3blwI8JreZ7inal4iVSpNAedDl1Vfvd+3QC5qN6nIkbLSc+nl/xhwNkyuHnuzi+OtdGrxPZSmyKG8dkOh/66ZZrwxACe0aoHB1hvJEVwfLo1GfN5yahZXxNYF2S7d9drnZbC7X7aBdsDvqudN1kNkGts5XrplcCkZYKpdjhCAX6Ri3z5Gi491WRPg74a2gS9vVCwtCLhXAZlWXlPNdQXIv9FXmoirshW2YY78S+2TWxX1P/HnoW/3z4fG4yDB+DFfuavVbLjhmqwCWD30ZbX8zn/+PvV9LpszpspuoI6BDbM32h421Ba/5PmAkXKXevBnZtoMwCwz/kqA2pJjWch+wHVxHUTNP2sh5eXmfoqh8qc/C3X3AFvSRG7T6mfFWE2XW7aWrPB/FNU+PsJiGzTTlFOMS0n5/dw3puJfVZE2i3V62CpJaNgpbzeY+YFhMozMle+cvLy8UbVwla9wl67x07iuUw98mDLowhdD7gK96svZ2G/DbdcAeLsrdCRy9RnRNl8v7gDmyHKinIiijU1E+Efi93Gazhhsfue+aa5WXpEtY61A94e4+4PlRkLafWY0O/7j0F8h9wKmc+T5gtRxkBGlxFs191e/cWu8DNk9SbhWg4SDg5aUSibK/X19wvA9YvfPdrQ4kCdrFVSafS7t2EAQv5lLmpzDj5RaBQ4HS0ZMShahDJvnqx/mwmLf0XaigumYg9RWIRhS3VFtpL6qM8H4fcM2atajMkEXCdvKSlKYN/xXPfffZuPPYuDpwA8nQUGY+CvdAgdfGkS6hJrqT9dnt2XoC25d9KASUdDKb/isD6Ehn7PE5BFn+ZDtVov7eHph7WktBVht9LX2JxNR9+j4AlNjYTqOysv3ScXHlzztSuXzzL60vbmm66KIMshQr/94uv2hQqYcsg9Z/ph/8Zb5HXkVtoPlGeZHtj/SGW0OmZvMrJeqvGYRWb2TyGO7+lzXEifwN2VSVLx61TgzIk724bpaiWUkTiRO58EQ2W8qX2dtRVNRruTEiRIJIlxuj0YlWuLmeT1v1TuWrD94HXP1qPrwmyXmmeWUkmXLcf0dbTExMTExMTExMTExMTExMTEzM/wH/Ayo2myKgFJ0rAAAAAElFTkSuQmCC"
          id="goLegacy_svg__b"
          width={225}
          height={225}
        />
      </defs>
    </svg>
  );
}
